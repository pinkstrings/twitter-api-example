import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import {List} from 'immutable'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import sampleTweetlist from '../../utils/sample-tweetlist.js'

import {App, mapStateToProps, mapDispatchToProps} from '../../../src/containers/app'
import styles from '../../../src/containers/app.css'
import tweetStyles from '../../../src/components/tweet.css'
import initialState from '../../../src/helpers/initial-redux-state'

const mockStore = configureStore([thunkMiddleware])

function setup(passedState = {}) {
  const nextState = {
    ...initialState
  }

  nextState.app.lastUpdated = Date.now()

  if (passedState) {
    if (passedState.app) {
      nextState.app = {
        ...nextState.app,
        ...passedState.app
      }
    }

    if (passedState.entities) {
      nextState.entities = {
        ...nextState.entities,
        ...passedState.entities
      }
    }
  }

  const store = mockStore(nextState)
  const state = store.getState()

  const appProps = {
    ...mapStateToProps(state),
    ...mapDispatchToProps(store.dispatch)
  }

  const wrapper = mount(
    <App {...appProps} />
  )

  return {
    wrapper
  }
}

describe('<App />', function () {
  context('initial state', function () {
    it(`App class is ${styles.wrapper}`, function () {
      const {wrapper} = setup()
      expect(wrapper.render().find(`.${styles.wrapper}`)).to.have.length(1)
    })

    it('App props.error === null', function () {
      const {wrapper} = setup()
      return expect(wrapper.prop('error')).to.be.null
    })

    it('App props.isLoading === false', function () {
      const {wrapper} = setup()
      return expect(wrapper.prop('isLoading')).to.be.false
    })

    it('App props.tweets instanceOf Immutable.List', function () {
      const {wrapper} = setup()
      expect(wrapper.prop('tweets')).to.be.an.instanceOf(List)
    })

    it('App props.tweets.size === 0', function () {
      const {wrapper} = setup()
      expect(wrapper.prop('tweets').size).to.equal(0)
    })

    it('App has 2 child nodes', function () {
      const {wrapper} = setup()
      expect(wrapper.children()).to.have.length(2)
    })

    it('App nth-child(0) instanceOf Updated', function () {
      const {wrapper} = setup()
      expect(wrapper.childAt(0).name()).to.equal('Updated')
    })

    it('App nth-child(1) is div', function () {
      const {wrapper} = setup()
      expect(wrapper.childAt(1).type()).to.equal('div')
    })

    it(`App > div class is ${styles.appContainer}`, function () {
      const {wrapper} = setup()
      expect(wrapper.childAt(1).render().find(`.${styles.appContainer}`)).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} nth-child(0) instanceOf SearchField`, function () {
      const {wrapper} = setup()
      expect(wrapper.childAt(1).childAt(0).name()).to.equal('SearchField')
    })

    it(`App > div.${styles.appContainer} nth-child(1) is <ul>`, function () {
      const {wrapper} = setup()
      expect(wrapper.childAt(1).childAt(1).type()).to.equal('ul')
    })

    it(`App > div.${styles.appContainer} > ul has 1 child node`, function () {
      const {wrapper} = setup()
      expect(wrapper.childAt(1).childAt(1).children()).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul nth-child(0) is <li>`, function () {
      const {wrapper} = setup()
      expect(
        wrapper
        .childAt(1).childAt(1).childAt(0)
          .render()
          .find(`.${tweetStyles.tweet}`)
      ).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul > li class is ${tweetStyles.tweet}`, function () {
      const {wrapper} = setup()
      expect(
        wrapper
        .childAt(1).childAt(1).childAt(0)
          .render()
          .find(`.${tweetStyles.tweet}`)
      ).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul > li.${tweetStyles.tweet} text contains 'No tweets found.'`, function () {
      const {wrapper} = setup()
      return expect(
        wrapper.childAt(1).childAt(1).childAt(0).text()
          .includes('No tweets found.')
      ).to.be.true
    })
  })

  context('error state', function () {
    const nextState = {
      app: {
        error: 'There was an error.'
      }
    }

    it('App props.error typeof string', function () {
      const {wrapper} = setup(nextState)

      expect(wrapper.prop('error')).to.be.a('string')
    })

    it('App has 2 child nodes', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.children()).to.have.length(2)
    })

    it('App nth-child(0) instanceOf Updated', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(0).name()).to.equal('Updated')
    })

    it('App nth-child(1) is div', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).type()).to.equal('div')
    })

    it(`App > div class is ${styles.appContainer}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).render().find(`.${styles.appContainer}`)).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} nth-child(0) instanceOf SearchField`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(0).name()).to.equal('SearchField')
    })

    it(`App > div.${styles.appContainer} nth-child(1) is <ul>`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).type()).to.equal('ul')
    })

    it(`App > div.${styles.appContainer} > ul has 1 child node`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).children()).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul nth-child(0) is <li>`, function () {
      const {wrapper} = setup(nextState)
      expect(
        wrapper
        .childAt(1).childAt(1).childAt(0)
          .render()
          .find(`.${tweetStyles.tweet}`)
      ).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul > li class is ${tweetStyles.tweet}`, function () {
      const {wrapper} = setup(nextState)
      expect(
        wrapper
        .childAt(1).childAt(1).childAt(0)
          .render()
          .find(`.${tweetStyles.tweet}`)
      ).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul nth-child(0) text contains state.app.error`, function () {
      const {wrapper} = setup(nextState)
      return expect(
        wrapper.childAt(1).childAt(1).childAt(0).text()
          .includes(nextState.app.error)
      ).to.be.true
    })
  })

  context('state with 5 tweets', function () {
    const nextState = {
      entities: {
        tweets: sampleTweetlist
      }
    }

    it('App props.error === null', function () {
      const {wrapper} = setup(nextState)
      return expect(wrapper.prop('error')).to.be.null
    })

    it('App props.tweets.size === 5', function () {
      const {wrapper} = setup(nextState)
      return expect(wrapper.prop('tweets').size).to.equal(5)
    })

    it('App has 2 child nodes', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.children()).to.have.length(2)
    })

    it('App nth-child(0) instanceOf Updated', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(0).name()).to.equal('Updated')
    })

    it('App nth-child(1) is div', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).type()).to.equal('div')
    })

    it(`App > div class is ${styles.appContainer}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).render().find(`.${styles.appContainer}`)).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} nth-child(0) instanceOf SearchField`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(0).name()).to.equal('SearchField')
    })

    it(`App > div.${styles.appContainer} nth-child(1) is ul`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).type()).to.equal('ul')
    })

    it(`App > div.${styles.appContainer} > ul has 5 child nodes`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).children()).to.have.length(5)
    })

    it(`App > div.${styles.appContainer} > ul nth-child(0) is <Tweet />`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).childAt(0).name()).to.equal('Tweet')
    })

    it(`App > div.${styles.appContainer} ul > Tweet class is ${tweetStyles.tweet}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).render().find(`.${tweetStyles.tweet}`)).to.have.length(5)
    })
  })

  context('state with 5 tweets && searchQuery === "huzzah" (1 result)', function () {
    const nextState = {
      app: {
        searchQuery: 'huzzah'
      },
      entities: {
        tweets: sampleTweetlist
      }
    }

    it('App props.error === null', function () {
      const {wrapper} = setup(nextState)
      return expect(wrapper.prop('error')).to.be.null
    })

    it('App props.tweets.size === 5', function () {
      const {wrapper} = setup(nextState)
      return expect(wrapper.prop('tweets').size).to.equal(5)
    })

    it('App has 2 child nodes', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.children()).to.have.length(2)
    })

    it('App nth-child(0) instanceOf Updated', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(0).name()).to.equal('Updated')
    })

    it('App nth-child(1) is div', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).type()).to.equal('div')
    })

    it(`App > div class is ${styles.appContainer}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).render().find(`.${styles.appContainer}`)).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} nth-child(0) instanceOf SearchField`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(0).name()).to.equal('SearchField')
    })

    it(`App > div.${styles.appContainer} nth-child(1) is ul`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).type()).to.equal('ul')
    })

    it(`App > div.${styles.appContainer} > ul has 1 child node`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).children()).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul nth-child(0) is <Tweet />`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).childAt(0).name()).to.equal('Tweet')
    })

    it(`App > div.${styles.appContainer} ul > Tweet class is ${tweetStyles.tweet}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).render().find(`.${tweetStyles.tweet}`)).to.have.length(1)
    })
  })

  context('state with 5 tweets && searchQuery === "somerandomstring" (0 results)', function () {
    const nextState = {
      app: {
        searchQuery: 'somerandomstring'
      },
      entities: {
        tweets: sampleTweetlist
      }
    }

    it('App props.error === null', function () {
      const {wrapper} = setup(nextState)
      return expect(wrapper.prop('error')).to.be.null
    })

    it('App props.tweets.size === 5', function () {
      const {wrapper} = setup(nextState)
      return expect(wrapper.prop('tweets').size).to.equal(5)
    })

    it('App has 2 child nodes', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.children()).to.have.length(2)
    })

    it('App nth-child(0) instanceOf Updated', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(0).name()).to.equal('Updated')
    })

    it('App nth-child(1) is div', function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).type()).to.equal('div')
    })

    it(`App > div class is ${styles.appContainer}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).render().find(`.${styles.appContainer}`)).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} nth-child(0) instanceOf SearchField`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(0).name()).to.equal('SearchField')
    })

    it(`App > div.${styles.appContainer} nth-child(1) is ul`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).type()).to.equal('ul')
    })

    it(`App > div.${styles.appContainer} > ul has 1 child node`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).children()).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul nth-child(0) is <li>`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).childAt(0).type()).to.equal('li')
    })

    it(`App > div.${styles.appContainer} ul > li class is ${tweetStyles.tweet}`, function () {
      const {wrapper} = setup(nextState)
      expect(wrapper.childAt(1).childAt(1).render().find(`.${tweetStyles.tweet}`)).to.have.length(1)
    })

    it(`App > div.${styles.appContainer} > ul > li.${tweetStyles.tweet} text contains 'No tweets found.'`, function () {
      const {wrapper} = setup(nextState)
      return expect(
        wrapper.childAt(1).childAt(1).childAt(0).text()
          .includes('No tweets found.')
      ).to.be.true
    })
  })

  //
  // context('state with 5 tweets && searchQuery === "huzzah"', function () {
  //   const nextState = {
  //     app: {
  //       searchQuery: 'huzzah'
  //     },
  //     entities: {
  //       tweets: fiveTweets
  //     }
  //   }
  //
  //   it('App has 2 child nodes', function () {
  //     const {wrapper} = setup(nextState)
  //     expect(wrapper.children()).to.have.length(2)
  //   })
  //
  //   it('App first-child node is <input>', function () {
  //     const {wrapper} = setup(nextState)
  //     expect(wrapper.childAt(0).type()).to.equal('input')
  //   })
  //
  //
  //   it(`App > input text === "${nextState.app.searchQuery}"`, function () {
  //     const {wrapper} = setup(nextState)
  //     expect(wrapper.children('input').text()).to.equal(nextState.app.searchQuery)
  //   })
  //
  //   it('App second-child node is <ul>', function () {
  //     const {wrapper} = setup(nextState)
  //     expect(wrapper.childAt(1).type()).to.equal('ul')
  //   })
  //
  //   it('App > ul has 1 child nodes', function () {
  //     const {wrapper} = setup(nextState)
  //     expect(wrapper.children('ul').children()).to.have.length(1)
  //   })
  // })
})
