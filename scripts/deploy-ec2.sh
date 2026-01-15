#!/bin/bash
# EC2 User Data script for t3.micro deployment
# Run as: sudo bash deploy-ec2.sh

set -e

echo "=== Cybersecurity Portfolio - EC2 Deployment ==="
echo "Optimized for t3.micro (1GB RAM, 2 vCPU)"

# Update system
apt-get update -y
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create swapfile for low memory situations
if [ ! -f /swapfile ]; then
    echo "Creating 512MB swapfile..."
    fallocate -l 512M /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# Create app directory
mkdir -p /var/www/portfolio
cd /var/www/portfolio

# Clone repository (update with your repo URL)
if [ ! -d ".git" ]; then
    git clone https://github.com/rizzzabh-06/new.git .
else
    git pull origin main
fi

# Create .env file (update with your values)
cat > .env << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
EOF

# Create SSL directory
mkdir -p ssl

# Build and run with Docker Compose
docker-compose down || true
docker-compose build --no-cache
docker-compose up -d

# Setup logrotate for Docker logs
cat > /etc/logrotate.d/docker-container << 'EOF'
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=10M
    missingok
    delaycompress
    copytruncate
}
EOF

# Setup cron for cleanup
(crontab -l 2>/dev/null; echo "0 2 * * * docker system prune -f") | crontab -

echo ""
echo "=== Deployment Complete ==="
echo "Portfolio running at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo ""
echo "Next steps:"
echo "1. Update .env with your Supabase credentials"
echo "2. Add SSL certificates to /var/www/portfolio/ssl/"
echo "3. Uncomment HTTPS in nginx.conf"
echo "4. Run: docker-compose restart nginx"
