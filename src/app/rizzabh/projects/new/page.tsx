'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/auth';
import { createBrowserSupabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tech: '',
        category: 'Security',
        github: '',
        demo: '',
        image: '',
    });

    useEffect(() => {
        async function checkAuth() {
            const user = await getUser();
            if (!user) router.push('/rizzabh/login');
        }
        checkAuth();
    }, [router]);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to Supabase Storage
        const supabase = createBrowserSupabase();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            toast.error('Failed to upload image');
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        setFormData({ ...formData, image: publicUrl });
        toast.success('Image uploaded!');
    }

    function removeImage() {
        setImagePreview(null);
        setFormData({ ...formData, image: '' });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const supabase = createBrowserSupabase();

        const { error } = await supabase.from('projects').insert({
            name: formData.name,
            description: formData.description,
            tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
            category: formData.category,
            github: formData.github || null,
            demo: formData.demo || null,
            image: formData.image || null,
        });

        if (error) {
            toast.error('Failed to create project');
            setLoading(false);
            return;
        }

        toast.success('Project created!');
        router.push('/rizzabh/projects');
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/rizzabh/projects">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">New Project</h1>
                </div>

                <Card className="bg-card border border-border">
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Project Image</Label>
                                <div className="flex items-start gap-4">
                                    {imagePreview ? (
                                        <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-secondary">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-1 right-1 p-1 rounded-full bg-background/80 hover:bg-background"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-40 h-24 rounded-lg border-2 border-dashed border-border hover:border-muted-foreground cursor-pointer transition-colors">
                                            <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                                            <span className="text-xs text-muted-foreground">Upload</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG up to 2MB. Will be displayed on project cards.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Project Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-background"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-background"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tech">Tech Stack (comma-separated)</Label>
                                    <Input
                                        id="tech"
                                        value={formData.tech}
                                        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                        className="bg-background"
                                        placeholder="Next.js, Python, AWS"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full h-10 px-3 rounded-md bg-background border border-input"
                                    >
                                        <option value="Security">Security</option>
                                        <option value="AI">AI</option>
                                        <option value="Blockchain">Blockchain</option>
                                        <option value="Web">Web</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub URL</Label>
                                <Input
                                    id="github"
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="bg-background"
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="demo">Demo URL</Label>
                                <Input
                                    id="demo"
                                    type="url"
                                    value={formData.demo}
                                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                    className="bg-background"
                                    placeholder="https://..."
                                />
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                                <Save className="w-4 h-4 mr-2" />
                                {loading ? 'Creating...' : 'Create Project'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
