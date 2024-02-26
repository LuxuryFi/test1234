import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import moment from 'moment';
import ScrollToTop from 'react-scroll-to-top';

import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import {
  fetchArticle,
  fetchArticlesLatest,
  fetchTags,
  selectArticleDetail,
  selectArticlesLatest,
  selectTags,
} from '../../../store/slices/articlesSlice';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function ArticleDetail() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const tags = useSelector(selectTags);
  const articleDetail = useSelector(selectArticleDetail);
  const articlesLatest = useSelector(selectArticlesLatest);

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticlesLatest());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <Navigation />
      <div className="article-detail-container mg-header">
        <div className="container-fluid">
          <Row>
            <Col className="left" sm={12} md={12} lg={16} xl={16} xll={16}>
              <h2 className="title">{articleDetail.title}</h2>
              <div className="share-socials">
                <span>Share: </span>
                <p className="social facebook">
                  <FaFacebookF className="icon" />
                </p>
                <p className="social twitter">
                  <FaTwitter className="icon" />
                </p>
              </div>
              <div className="articel-detail-content">
                <div
                  className="article-content view ql-editor"
                  dangerouslySetInnerHTML={{ __html: articleDetail.content }}
                ></div>
              </div>
              <div className="tag-list">
                <span className="text">Tags: </span>
                {Object.keys(articleDetail).length > 0 &&
                  articleDetail.tags.map((item, index) => (
                    <Link
                      to={`/articles/tag/${item.tag_id}`}
                      key={index}
                      className="button button--light tag-item"
                    >
                      {item['tag.tag_name']}
                    </Link>
                  ))}
              </div>
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
                  {tags.map((tag, index) => {
                    let active = false;
                    if (
                      Object.keys(articleDetail).length > 0 &&
                      articleDetail.tags.length > 0
                    ) {
                      articleDetail.tags.find((item) => {
                        if (item.tag_id === tag.tag_id) {
                          return (active = true);
                        }
                        return false;
                      });
                    }

                    return (
                      <Link
                        to={`/articles/tag/${tag.tag_id}`}
                        type="button"
                        key={index}
                        className={`button button--light square tag-button ${
                          active ? 'active' : ''
                        }`}
                      >
                        <span>{tag.tag_name}</span>
                      </Link>
                    );
                  })}
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
