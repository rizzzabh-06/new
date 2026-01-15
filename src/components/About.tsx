'use client';

import { motion } from 'framer-motion';

export function About() {
    return (
        <section id="about" className="section-padding">
            <div className="container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="prose prose-lg max-w-none"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
                        About
                    </h2>

                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            I&apos;m a second-year Computer Science student specializing in Cybersecurity and Digital Forensics. My approach is hands-on: I break systems to understand them, then design defenses that work in practice, not just in theory.
                        </p>
                        <p>
                            My work spans web application security, blue team operations, OSINT investigations, and applied security research. I&apos;ve gotten my hands dirty with AI-driven security tooling and blockchain forensics—not as buzzwords, but as tools I actually use to solve problems.
                        </p>
                        <p>
                            I run a home lab where I simulate attack and defense scenarios. I build tools when existing ones don&apos;t fit. And I document everything I learn, because teaching forces you to truly understand.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
