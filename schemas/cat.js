export default {
  name: 'cat',
  title: 'Cat',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'temperament',
      title: 'Temperament',
      type: 'string'
    },
    {
      name: 'wikipediaUrl',
      title: 'Wikipedia URL',
      type: 'url'
    },
    { 
      name: 'originLocation',
      title: 'Origin Location',
      type: 'string'
    },
    {
      name: 'traits',
      title: 'Traits',
      type: 'traits'
    }
  ]
}