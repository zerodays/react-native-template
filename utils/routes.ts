const Routes = {
  guest: {
    index: '/(guest)',
  },
  auth: {
    index: '/(authenticated)',
  },
} as const;

export default Routes;

// ---- EXAMPLE STRUCTURE ----
/* 
If folder structure is like this:
- app
  - index.tsx
  - artists
    - [artistId]
      - index.tsx
      - songs
        - [songId].tsx
        - index.tsx


const ExampleRoutes = {
  index: Route('/'),
  artists: {
    index: Route('/artists'),
    artist: (artistId: string) => ({
      index: Route({
        pathname: '/artists/[artistId]/',
        params: { artistId },
      }),
      songs: {
        index: Route({
          pathname: '/artists/[artistId]/songs/',
          params: { itemId },
        }),
        song: (songId: string) =>
          Route({
            pathname: '/artists/[artistId]/songs/[songId]',
            params: { artistId, songId },
          }),
      },
    }),
  },
} as const; 
*/

// ---- EXAMPLE USAGE ----
/*
import Routes from '@utils/routes';

const router = useRouter();
router.push(Routes.artists.artist('1').songs.song('2'));
*/
