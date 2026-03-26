import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors());

app.get('/api/trending', async (req, res) => {
    try {
        const { data } = await axios.get('https://github.com/trending');
        const $ = cheerio.load(data);
        const repos = [];

        $('.Box-row').each((i, el) => {
            const titleRaw = $(el).find('h2.h3 a').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
            const title = titleRaw.split('/').map(s => s.trim()).join(' / ');
            const link = 'https://github.com' + $(el).find('h2.h3 a').attr('href');
            const description = $(el).find('p').text().trim();
            const language = $(el).find('span[itemprop="programmingLanguage"]').text().trim();

            let starsRaw = '';
            $(el).find('a[href$="/stargazers"]').each((_, a) => {
                starsRaw = $(a).text().trim();
            });
            const stars = starsRaw ? parseInt(starsRaw.replace(/,/g, ''), 10) : 0;

            const todayStarsRaw = $(el).find('span.float-sm-right').text().trim();
            const todayStarsMatch = todayStarsRaw.match(/([\d,]+)\s*stars today/);
            const starsToday = todayStarsMatch ? parseInt(todayStarsMatch[1].replace(/,/g, ''), 10) : 0;

            repos.push({
                id: i,
                title,
                description,
                language: language || 'Unknown',
                stars,
                starsToday,
                link
            });
        });

        // The user requested top 5 highest stars among the trending today
        const top5 = repos.sort((a, b) => b.stars - a.stars).slice(0, 5);

        res.json(top5);
    } catch (error) {
        console.error('Error scraping:', error.message);
        res.status(500).json({ error: 'Failed to fetch github trending' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Scraper server is running on port ${PORT}`);
});
