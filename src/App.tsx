import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, BookOpen, GitFork, ArrowUpRight, Code2 } from 'lucide-react';

interface Repo {
    id: number;
    title: string;
    description: string;
    language: string;
    stars: number;
    starsToday: number;
    link: string;
}

function App() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/trending')
            .then(res => res.json())
            .then(data => {
                setRepos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-4 ring-1 ring-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <Trophy className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 sm:text-5xl md:text-6xl">
                        Top 5 GitHub Trending
                    </h1>
                    <p className="mt-4 text-xl text-gray-400 font-medium">
                        Repositories with the highest stars today
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                    >
                        {repos.map((repo, index) => (
                            <motion.a
                                href={repo.link}
                                target="_blank"
                                rel="noreferrer"
                                variants={itemVariants}
                                key={repo.id}
                                className="group relative block overflow-hidden rounded-2xl bg-white/5 p-6 md:p-8 backdrop-blur-xl ring-1 ring-white/10 hover:ring-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent" />

                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-gray-300 font-bold ring-1 ring-gray-700">
                                                #{index + 1}
                                            </span>
                                            <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                                {repo.title}
                                            </h2>
                                        </div>

                                        <p className="mt-4 text-gray-400 text-lg leading-relaxed line-clamp-2">
                                            {repo.description || 'No description provided.'}
                                        </p>

                                        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-medium">
                                            <div className="flex items-center text-gray-300 bg-white/5 py-1.5 px-3 rounded-full ring-1 ring-white/5">
                                                <Code2 className="w-4 h-4 mr-2 text-blue-400" />
                                                {repo.language}
                                            </div>

                                            <div className="flex items-center text-gray-300">
                                                <Star className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400/20" />
                                                {repo.stars.toLocaleString()} total stars
                                            </div>

                                            <div className="flex items-center text-green-400 bg-green-400/10 py-1 px-3 rounded-full ring-1 ring-green-400/20">
                                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                                {repo.starsToday.toLocaleString()} today
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex shrink-0">
                                        <div className="p-3 bg-white/5 rounded-full ring-1 ring-white/10 group-hover:bg-purple-500/20 group-hover:ring-purple-500/50 transition-colors duration-300">
                                            <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-purple-300" />
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default App;
