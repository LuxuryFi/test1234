import React, { useEffect } from 'react';
import { message, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ImEye } from 'react-icons/im';

import {
  fetchMedicalRecords,
  selectMedicalRecordIsLoading,
  selectMedicalRecords,
} from '../../../store/slices/medicalRecordsSclie';
import Tag from '../../../components/Tag';
import { formatDateAndTime } from '../../../helpers/formatDate';
import { selectCurrentUser } from '../../../store/slices/usersSlice';
import Button from '../../../components/Button';

export default function MedicalRecordList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const medicalRecords = useSelector(selectMedicalRecords);
  const isLoading = useSelector(selectMedicalRecordIsLoading);
  const user = useSelector(selectCurrentUser);

  const medicalRecordColumns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'record_id',
    },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => <Tag status={record.status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="button-containers">
          <Button
            onClick={() => {
              if (record.status === 'in progress') {
                message.warning(
                  `Its status is still in progress so you can't see it`,
                  3
                );
              } else if (
                record.status === 'done' &&
                record.status === 'received'
              ) {
                navigate(`detail/${record.record_id}`, { replace: true });
              }
              // navigate(`detail/${record.record_id}`, { replace: true });
            }}
            className="button button--blue--light square"
          >
            <ImEye className="icon" />
            <span>View</span>
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(fetchMedicalRecords(user.patient_id));
    }
  }, [dispatch, user]);

  return (
    <div className="medical-record-container">
      <div className="header">
        <h3 className="title">Favorite</h3>
        {/* <Link to="create" className="button button--blue--light">
          Add medical record
        </Link> */}
      </div>

      <Table
        className="medical-record-table"
        x={true}
        loading={isLoading}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        columns={medicalRecordColumns}
        dataSource={medicalRecords}
        rowKey={(record) => record.record_id}
      />
    </div>
  );
}
