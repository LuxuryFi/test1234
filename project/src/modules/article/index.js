import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsTagsFill } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';

import {
  fetchArticles,
  fetchArticlesByTag,
  fetchArticlesByType,
  fetchArticlesLatest,
  fetchTags,
  selectArticles,
  selectArticlesLatest,
  selectCount,
  selectTags,
} from '../../store/slices/articlesSlice';
import moment from 'moment';
import Pagination from '../../components/Pagination';

export default function ArticleList({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const tags = useSelector(selectTags);
  const articles = useSelector(selectArticles);
  const count = useSelector(selectCount);
  const articlesLatest = useSelector(selectArticlesLatest);

  useEffect(() => {
    if (type === 'all') {
      dispatch(fetchArticles(page));
    } else if (type === 'tag') {
      dispatch(
        fetchArticlesByTag({
          tag_id: id,
          pages: page,
        })
      );
    } else if (type === 'type') {
      dispatch(
        fetchArticlesByType({
          type_id: id,
          pages: page,
        })
      );
    }
  }, [dispatch, id, page, type]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticlesLatest());
  }, [dispatch]);

  const handleClickArticle = (slug) => {
    navigate(`/articles/detail/${slug}`, { replace: true });
  };

  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <Navigation />
      <div className="article-container mg-header">
        <div className="container-fluid">
          <Row>
            <Col className="left" sm={12} md={12} lg={16} xl={16} xll={16}>
              <div className="article-list">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className="article-item"
                    onClick={() => handleClickArticle(article.slug)}
                  >
                    <div className="thumbnail-container">
                      <img
                        alt="article-thumbnail"
                        className="thumbnail"
                        src={article.image}
                      />
                    </div>
                    <div className="content">
                      <Link
                        to={`/articles/detail/${article.slug}`}
                        className="title"
                      >
                        {article.title}
                      </Link>
                      <div className="article-info-list">
                        <p className="article-info-item">
                          <span className="icon">
                            <AiOutlineClockCircle />
                          </span>
                          <span className="text">
                            {moment(article.created_date).format('MMM Do YY')}
                          </span>
                        </p>
                        <p className="article-info-item">
                          <span className="icon">
                            <BsTagsFill />
                          </span>
                          <span className="text">Health Tips</span>
                        </p>
                      </div>
                      <p className="summary">{article.summary}</p>
                      <Link
                        to={`/articles/detail/${article.slug}`}
                        className="button button--blue--dark square"
                        type="button"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination setPage={setPage} currentPage={page} count={count} />
            </Col>
            <Col className="right" sm={12} md={12} lg={8} xl={8} xll={8}>
              <div className="latest-container">
                <h3 className="title">Latest Posts</h3>
                <ul className="latest-list">
                  {articlesLatest &&
                    articlesLatest.map((item, index) => (
                      <Link
                        to={`/articles/detail/${item.slug}`}
                        key={index}
                        className="latest-item"
                      >
                        <img
                          className="thumbnail"
                          src={item.image}
                          alt="lastest thumbnail"
                        />
                        <div className="sub-content">
                          <h3 className="sub-title">{item.title}</h3>
                          <p className="sub-date">
                            {moment(item.created_date).format('MMM Do YY')}
                          </p>
                        </div>
                      </Link>
                    ))}
                </ul>
              </div>
              <div className="tag-container">
                <h3 className="title">Tags</h3>
                <div className="tag-list">
                  {tags.map((tag, index) => (
                    <Link
                      to={`/articles/tag/${tag.tag_id}`}
                      key={index}
                      className="button button--light square tag-button"
                    >
                      <span>{tag.tag_name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
