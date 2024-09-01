# Changelog 🚀

### [changelog.bestregards.me](changelog.bestregards.me)

## Writing articles

To write a new blog post, create a new `.mdx` file in the `/pages/changelogs` directory.

### Anatomy of an MDX article

MDX is a superset of markdown that lets you write JSX directly in your markdown files. It is a powerful way to add dynamic interactivity, and embed components within your content, helping you to bring your pages to life.

![mdx-preview](https://github.com/danieljune/changelog/assets/104089773/83a35930-8f4e-4c3d-a077-afcd8251af0b)

Learn more 👉 [Next.js: Using MDX](https://nextjs.org/docs/advanced-features/using-mdx), [Using MDX](https://mdxjs.com/docs/using-mdx/)

## Managing images and assets

If you start having too many changelogs, you'll want to move your images in an S3 bucket.

To do so you'll need to:

1. Create an S3 bucket for your changelog images
2. Add the bucket name to your `.env` file
3. Make sure you are authenticated to your AWS account and have the `aws` CLI installed
4. Create a `changelog-images` directory in your repository (`mkdir changelog-images`)
5. Run `sync_images.sh` to sync the images from your local to your S3 bucket

You'll need to run the `sync_images.sh` script to sync your local images with your S3 bucket. This script will upload all images in the `/changelog-images` directory to your S3 bucket.

```bash
./sync_images.sh
```
