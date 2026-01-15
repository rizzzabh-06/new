'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const categories = ['All', 'Web', 'Crypto', 'OSINT', 'Pwn', 'Forensics', 'Misc'];

export function WriteupSearch() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search writeups..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 focus:border-neon-green"
                />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                        className={
                            activeCategory === category
                                ? 'bg-neon-green text-black hover:bg-neon-green/80'
                                : 'border-white/20 hover:border-neon-green/50 hover:text-neon-green'
                        }
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    );
}
