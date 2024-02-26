import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ImEye } from 'react-icons/im';
import { AiFillPrinter } from 'react-icons/ai';

import Tag from '../../../components/Tag';
import Button from '../../../components/Button';
import {
  fetchWatch,
  // selectWatchIsLoading,
  selectWatches,
} from '../../../store/slices/paymentsSlice';
import { formatDateAndTime } from '../../../helpers/formatDate';
import { Link } from 'react-router-dom';

export default function Watch() {
  const dispatch = useDispatch();
  const payments = useSelector(selectWatches);
  // const isLoading = useSelector(selectWatchIsLoading);

  useEffect(() => {
    dispatch(fetchWatch());
  }, [dispatch]);

  const paymentColumns = [
    {
      title: 'Watch ID',
      key: 'ID',
      dataIndex: 'watch_id',
    },
    {
      title: 'Product Name',
      key: 'Product_Name',
      dataIndex: 'product.title',
    },
    {
      title: 'Thumnail',
      key: 'Product_Image',
      dataIndex: 'product.documents.document',
      width: '20%',
      height: '100',
      render: Product_Image => <img style={{ width: '50%'}} alt={Product_Image} src={`${process.env.REACT_APP_API_URL}/documents/${Product_Image}`} />
    },
    {
      title: 'Created Date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="button-container">
        <Button
          className="button button--main--book rounded"
        >
          Delete
      </Button>
      </div>
      ),
    },
  ];

  return (
    <Table
      rowClassName="payment-row"
      x={true}
      // loading={isLoading}
      scroll={{ x: 300 }}
      pagination={{
        position: ['bottomCenter'],
      }}
      columns={paymentColumns}
      dataSource={payments}
      rowKey={(record) => record.order_id}
    />
  );
}
