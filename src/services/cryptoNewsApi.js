import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '1131a27c20msh9b596f01269e35fp1a7b77jsn1f07cc31f009'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url, params) => ({ 
  url, 
  headers: cryptoNewsApiHeaders, 
  params 
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count}) => createRequest(
        '/news/search', {
        q: newsCategory,
        safeSearch: 'Off',
        textFormat: 'Raw',
        freshness: 'Day',
        count
      })
    })
  })
});

export const {
  useGetCryptoNewsQuery
} = cryptoNewsApi;