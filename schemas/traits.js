export default {
  name: 'traits',
  title: 'Traits',
  type: 'object',
  options: {
    columns: 2
  },
  fields: [
    {
      name: 'energyLevel',
      title: 'Energy Level',
      type: 'number',
      options: {
        range: { min: 0, max: 5, step: 1 }
      }
    },
    {
      name: 'affectionLevel',
      title: 'Affection Level',
      type: 'number',
      options: {
        range: { min: 0, max: 5, step: 1 }
      }
    },
    {
      name: 'dogFriendly',
      title: 'Dog Friendliness',
      type: 'number',
      options: {
        range: { min: 0, max: 5, step: 1 }
      }
    },
    {
      name: 'intelligenceLevel',
      title: 'Intelligence Level',
      type: 'number',
      options: {
        range: { min: 0, max: 5, step: 1 }
      }
    }
  ]
}