import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-api6.p.rapidapi.com/shazam/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '5af55334cbmsh6c9dd08dc73079cp152cdbjsn87281ce127b8');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => `/top_tracks_country?country_code=US&limit=20`,
    }),
    getTracks: builder.query({
      query: (searchQuery) => `/search_track/?query=${searchQuery}&limit=6`,
    }),
    // getSimilarSongs: builder.query({
    //   query: (trackid) => `/similar_tracks?track_id=${trackid}&limit=8&offset=0`,
    // }),
  }),
});

export const { useGetTopChartsQuery, useGetTracksQuery, useGetSimilarSongsQuery} = shazamApi;









// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//   // fetch('https://shazam.p.rapidapi.com/charts/track', options)
//   //   .then(response => response.json())
//   //   .then(response => console.log(response))
//   //   .catch(err => console.error(err));

// export const shazamApi = createApi({
//     reducerPath: 'shazamApi',
//     baseQuery: fetchBaseQuery({
//       baseUrl: 'https://shazam.p.rapidapi.com/',
//       prepareHeaders: (headers) =>{
//         headers.set('X-RapidAPI-Key', '861e75ac51msh136447bf360b4e6p1e0e8ejsn66698c226405')
//         return headers
//       },
//     }),
//     endpoints: (builder) => ({
//       getTopCharts: builder.query({query: ()=>'/charts/track'}),
//     }),
// })

// export const { useGetTopChartsQuery } = shazamApi

