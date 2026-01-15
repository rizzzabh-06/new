'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import {
    Instagram,
    Linkedin,
    Twitter,
    Mail,
    Github,
    MessageCircle,
    Newspaper,
    ExternalLink,
} from 'lucide-react';

interface ConnectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const socialLinks = [
    {
        name: 'Instagram',
        icon: Instagram,
        url: 'https://instagram.com/rizzabh.unitie',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        url: 'https://linkedin.com/in/rizzzabh',
    },
    {
        name: 'X',
        icon: Twitter,
        url: 'https://x.com/Rizzabh_X',
    },
    {
        name: 'Email',
        icon: Mail,
        url: 'mailto:contact@rishabhrajsingh.com',
    },
    {
        name: 'Substack',
        icon: Newspaper,
        url: 'https://rizzabh06.substack.com',
    },
    {
        name: 'Discord',
        icon: MessageCircle,
        url: 'https://discord.gg/rizabh',
    },
    {
        name: 'GitHub',
        icon: Github,
        url: 'https://github.com/rizzzabh-06',
    },
];

export function ConnectModal({ open, onOpenChange }: ConnectModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Connect</h2>

                    <div className="space-y-1">
                        <AnimatePresence>
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg hover:bg-secondary transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        <span className="font-medium">{link.name}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.a>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ConnectModal;
