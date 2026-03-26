import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
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

        const top5 = repos.sort((a, b) => b.stars - a.stars).slice(0, 5);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(top5);
    } catch (error) {
        console.error('Error scraping:', error.message);
        res.status(500).json({ error: 'Failed to fetch github trending' });
    }
}
