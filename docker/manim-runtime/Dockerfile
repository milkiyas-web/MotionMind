# Use the official Python image (Debian-based)
FROM python:3.10-bullseye

# Prevents prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Install OS-level dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libcairo2 \
    libcairo2-dev \
    libpango-1.0-0 \
    libpango1.0-dev \
    libglib2.0-0 \
    libglib2.0-dev \
    build-essential \
    pkg-config \
    python3-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Manim
RUN pip install --upgrade pip && pip install manim

# Set working directory
WORKDIR /app

# Optional: copy your local Manim scripts
# COPY . /app

# Default command (can be overridden)
CMD ["manim", "-h"]
