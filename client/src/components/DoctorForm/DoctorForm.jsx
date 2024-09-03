import React from 'react';
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import moment from 'moment';

const DoctorForm = ({ onFinish, initialValues }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        ...(initialValues && {
          timings: initialValues?.timings ? [
            moment(initialValues?.timings[0], 'HH:mm'),
            moment(initialValues?.timings[1], 'HH:mm')
          ] : []
        })
      }}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First Name is required" }]}
          >
            <Input placeholder="Enter Your First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last Name is required" }]}
          >
            <Input placeholder="Enter Your Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Phone Number is required" }]}
          >
            <Input type="tel" placeholder="Enter Your Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Website" name="website">
            <Input placeholder="Enter Your Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input placeholder="Enter Your Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true, message: "Specialization is required" }]}
          >
            <Input placeholder="Enter Your Specialized Area" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true, message: "Experience is required" }]}
          >
            <Input type="number" placeholder="Enter Your Experience Level" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Fee Per Consultation"
            name="feePerConsultation"
            rules={[{ required: true, message: "Fee Per Consultation is required" }]}
          >
            <Input type="number" placeholder="Enter Your Fee Per Consultation" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Timings"
            name="timings"
            rules={[{ required: true, message: "Timings are required" }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button htmlType="submit" className="primary-button">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default DoctorForm;
