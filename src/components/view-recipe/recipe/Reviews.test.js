import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Reviews from './Reviews';
import { createRecipeStore } from '../../../test/test_state';

describe('Reviews', () => {
  const review = mount(<Provider store={createRecipeStore}><Reviews/></Provider>);
  const reviews = createRecipeStore.getState().reviews.data;

  it('renders correct number of stars per review', () => {
    const reviewStars = review.find('.review-star').map((rating, index) => {
      rating.children().map(child => {
        expect(child.type()).toEqual('img');
      });
      expect(rating.children()).toHaveLength(reviews[index].rating);
    });
  });

  it('renders reviews', () => {
    const reviewText = review.find('p').map((singleReview, index) => {
      expect(singleReview.text()).toEqual(reviews[index].review);
    });
  });

  it('shows the author of the review', () => {
    const reviewAuthor = review.find('AuthorTile');
    expect(reviewAuthor).toBeDefined();
  });

});