'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Security', 'AI', 'Blockchain', 'Web'];

export function ProjectsFilter() {
    const [active, setActive] = useState('All');

    return (
        <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={active === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActive(category)}
                    className={
                        active === category
                            ? 'bg-neon-green text-black hover:bg-neon-green/80'
                            : 'border-white/20 hover:border-neon-green/50 hover:text-neon-green'
                    }
                >
                    {category}
                </Button>
            ))}
        </div>
    );
}
