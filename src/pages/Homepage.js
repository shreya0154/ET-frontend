
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Table, message, DatePicker, Tooltip } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import Navbar from '../components/layouts/Navbar';
// import Footer from '../components/layouts/Footer';
import Layout from '../components/layouts/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';
import '../styles/style.scss';

const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState('30');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/transactions/get-transaction`, {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setAllTransactions(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      message.error('Unknown error occurred, Try Again');
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/transactions/delete-transaction`, {
        transactionId: record._id,
      });
      message.success('Transaction Deleted Successfully');
      setLoading(false);
      getAllTransactions();
    } catch (err) {
      setLoading(false);
      message.error('Unknown error occurred on Deletion, Please Try Again');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if (editable) {
        await axios.post(`${process.env.REACT_APP_API_URL}/transactions/edit-transaction`, {
          transactionId: editable._id,
          payload: {
            ...values,
          },
        });
        message.success('Transaction Edited Successfully');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/transactions/add-transaction`, {
          ...values,
          userid: user._id,
        });
        message.success('Transaction Added Successfully');
      }
      setShowModal(false);
      setEditable(null);
      getAllTransactions();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error('Unknown error occurred on adding, Please Try Again');
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 15 ? `${text.substring(0, 15)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

    const [form] = Form.useForm();

    useEffect(() => {
    if (editable) {
        form.setFieldsValue(editable);
    } else {
        form.resetFields();
    }
    }, [editable, form]);


  return (
    <>
      {/* <Navbar /> */}
      <Layout>
      <div className="homepage-container white-theme mt-5">
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(val) => setFrequency(val)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <RangePicker value={selectedDate} onChange={(val) => setSelectedDate(val)} />
            )}
          </div>

          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(val) => setType(val)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>

          <div className="switch-icon">
            <UnorderedListOutlined
              className={`mx-2 ${viewData === 'table' ? 'active-icon' : ''}`}
              onClick={() => setViewData('table')}
            />
            <AreaChartOutlined
              className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : ''}`}
              onClick={() => setViewData('analytics')}
            />
          </div>

          <div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add New
            </button>
          </div>
        </div>

        <div className="content">
          {viewData === 'table' ? (
            <Table columns={columns} dataSource={allTransactions} rowKey="_id" />
          ) : (
            <Analytics allTransactions={allTransactions} />
          )}
        </div>

        <Modal
          title={editable ? 'Edit Transaction' : 'Add Transaction'}
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setEditable(null);
          }}
          footer={false}
        >
          {/* <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}> */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>

            <Form.Item label="Amount" name="amount">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="pocket-money">Pocket-Money</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="flat-rent">Flat-Rent</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="education-fee">Education Fee</Select.Option>
                <Select.Option value="tax">TAX</Select.Option>
                <Select.Option value="clothes">Clothes</Select.Option>
                <Select.Option value="accessories">Accessories</Select.Option>
                <Select.Option value="stationery">Stationery</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </div>
      {/* <Footer /> */}
      </Layout>
    </>
  );
};

export default Homepage;