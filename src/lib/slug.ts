export async function generateUniqueSlug(
    baseText: string,
    checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
    const slugify = (text: string) =>
        text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

    const baseSlug = slugify(baseText);
    let slug = baseSlug;
    let counter = 1;

    while (await checkExists(slug)) {
        counter++;
        slug = `${baseSlug}-${counter}`;
    }

    return slug;
}
