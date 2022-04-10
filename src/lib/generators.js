export const generateManifest = async (options) => {
  const config = await import('/config');

  const { icons, ...rest } = options;
  const { APP_LOCATION: appLocation } = process.env;
  const { name } = config;

  const manifestMimeType = 'application/manifest+json';
  const manifestFilename = 'manifest.webmanifest';

  const defaultManifest = {
    name,
    short_name: name,
    description: 'Підтримайте Україну за допомогою свого девайсу',
    id: '/',
    start_url: appLocation,
    scope: appLocation,
    display: 'standalone',
    lang: 'uk-UA',
    background_color: '#e6e6fa',
    theme_color: '#e6e6fa',
    categories: ['utilities', 'social'],
    orientation: 'portrait-secondary',
    icons: [
      {
        src: new URL(
          '../../assets/images/favicons/favicon.svg',
          import.meta.url
        ),
        sizes: '16x16 32x32 48x48 72x72 80x80 96x96 128x128',
        type: 'image/svg+xml',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x180.svg',
          import.meta.url
        ),
        sizes: '180x180',
        type: 'image/svg+xml',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon_x256.png',
          import.meta.url
        ),
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon-maskable_x384.png',
          import.meta.url
        ),
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: new URL(
          '../../assets/images/favicons/favicon-splash_x512.png',
          import.meta.url
        ),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  const manifest = {
    ...defaultManifest,
    ...rest,
  };

  const manifestContent = JSON.stringify(manifest);
  const manifestBlob = new File([manifestContent], manifestFilename, {
    type: manifestMimeType,
  });
  const manifestURL = URL.createObjectURL(manifestBlob);

  const manifestElement = document.getElementById('manifest');

  manifestElement.href = manifestURL;

  return manifestURL;
};