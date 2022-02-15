import client from 'part:@sanity/base/client'

export const studioClient = client.withConfig({ apiVersion: '2022-02-15' })