import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'news',
  'gallery',
  'videos',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database with custom Politician Portfolio data...')

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database globals
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  // clear collections
  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)
  const heroImageBuffer = await fetchFileByURL(
    'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
  )

  const [demoAuthor, demoMedia] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Admin User',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Placeholder Media' },
      file: heroImageBuffer,
    }),
  ])

  payload.logger.info(`— Seeding News...`)
  
  const categories = await Promise.all([
    payload.create({ collection: 'categories', data: { title: 'समाचार', slug: 'news' } }),
    payload.create({ collection: 'categories', data: { title: 'प्रेस विज्ञप्ति', slug: 'press-release' } }),
    payload.create({ collection: 'categories', data: { title: 'विचार', slug: 'opinion' } }),
  ])

  for (let i = 1; i <= 20; i++) {
    const isOpinion = i >= 13 && i <= 15
    const category = isOpinion ? categories[2].id : (i % 3 === 0 ? categories[1].id : categories[0].id)
    
    await payload.create({
      collection: 'news',
      data: {
        title: isOpinion 
          ? `राजनीतिक विचार र दृष्टिकोण - भाग ${i}`
          : `राष्ट्रिय स्वाधीनता र विकासको नेतृत्व सम्बन्धी महत्वपूर्ण ${i%3===0 ? 'विज्ञप्ति' : 'समाचार'} - ${i}`,
        slug: `news-article-${i}`,
        publishDate: new Date('2024-04-01T10:00:00Z').toISOString(),
        category,
        featuredImage: demoMedia.id,
        hasVideo: i === 6 || i === 7, // Randomly flag a few as hasVideo
        excerpt: 'नेपाल कम्युनिष्ट पार्टीको स्थापना दिवसको अवसरमा आम नेपाली जनतामा हार्दिक शुभकामना व्यक्त गर्दछु। देश विकास र समृद्धिको लागि हामी सबै एक जुट हुनु आवश्यक छ।',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                   {
                     type: 'text',
                     detail: 0,
                     format: 0,
                     mode: 'normal',
                     style: '',
                     text: 'यो नमुना समाचार सामग्री हो। यसमा विस्तृत विवरणहरू प्रस्तुत गर्न सकिन्छ।',
                     version: 1,
                   }
                ]
              }
            ],
            direction: 'ltr',
          }
        }
      },
    })
  }

  payload.logger.info(`— Seeding Gallery...`)
  await payload.create({
    collection: 'gallery',
    data: {
      title: 'संसद बैठक तथा कार्यक्रमहरु',
      slug: 'parliament-sessions',
      date: new Date().toISOString(),
      photos: Array(6).fill({ image: demoMedia.id, caption: 'संसदमा सम्बोधन गर्दै' }),
    }
  })

  payload.logger.info(`— Seeding Videos...`)
  for (let i = 1; i <= 4; i++) {
    await payload.create({
      collection: 'videos',
      data: {
        title: i === 1 ? 'विशेष राष्ट्रिय सम्बोधन तथा निर्देशन' : `पार्टीको स्थायी समिति बैठकपछि पत्रकार सम्मेलन - भाग ${i}`,
        slug: `video-post-${i}`,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: demoMedia.id,
        date: new Date().toISOString()
      }
    })
  }

  payload.logger.info('Seeded database successfully! Custom data ready for frontend.')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
