import {List, Map} from 'immutable'

const user = {
  name: 'Foo',
  screen_name: 'foobar',
  profile_image_url: 'http://imgur.com/something.png'
}

const tweetlist = new List([
  new Map({
    id: 50004,
    id_str: '50004',
    retweet_count: 23,
    text: 'Raw denim taxidermy magna #keytar godard, cray chambray.',
    user,
    entities: {
      urls: [],
      hashtags: [
        {text: 'keytar'}
      ],
      media: [],
      user_mentions: []
    }
  }),
  new Map({
    id: 50003,
    id_str: '50003',
    retweet_count: 11,
    text: 'Direct trade slow-carb occupy, sed mixtape tumeric cronut church-key tumblr thundercats. http://foobar.com/fooz',
    user,
    entities: {
      urls: [
        {
          url: 'http://foo.br/short',
          expanded_url: 'http://foobar.com/full-url',
          display_url: 'foobar.com/full-url'
        }
      ],
      hashtags: [],
      media: [],
      user_mentions: []
    }
  }),
  new Map({
    id: 50002,
    id_str: '50002',
    retweet_count: 16,
    text: 'Helvetica placeat labore post-ironic chia nulla, microdosing fixie.',
    user,
    entities: {
      urls: [],
      hashtags: [],
      media: [],
      user_mentions: []
    }
  }),
  new Map({
    id: 50001,
    id_str: '50001',
    retweet_count: 18,
    text: 'Distillery meh selfies, health goth hammock irony VHS consectetur sint.',
    user,
    entities: {
      urls: [],
      hashtags: [],
      media: [],
      user_mentions: []
    }
  }),
  new Map({
    id: 50000,
    id_str: '50000',
    retweet_count: 22,
    text: 'Huzzah',
    user,
    entities: {
      urls: [],
      hashtags: [],
      media: [],
      user_mentions: []
    }
  })
])

export default tweetlist
