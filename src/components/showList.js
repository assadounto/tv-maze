import showsApi from '../api/shows.js';
import likesApi from '../api/likes.js';
import ShowCard from './showCard.js';
import renderpopup from './renderpopup.js';

export default class ShowList {
  constructor() {
    this.fetchShows();
  }

  async fetchShows() {
    try {
      const likes = await likesApi.getAll();
      const shows = await showsApi.getByPage(1);

      this.shows = shows
        .slice(0, 21)
        .map((show) => {
          const { likes: likesCount } = likes
            .find((like) => like.item_id === show.id) || { likes: 0 };

          return { ...show, likes: likesCount };
        });

      this.shows.forEach((show) => {
        const showCard = new ShowCard({ ...show, likes: 2 });
        showCard.onCommentClick = () => {
          renderpopup(show);
        };

        showCard.render();
      });
    } catch (e) {
    }
  }
}