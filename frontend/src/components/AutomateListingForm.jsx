import { useState } from 'react';
import { Form, Input, Select, Button, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;

const AutomateListing = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        listing: Number(values.listing),
        listing_name: values.listing_name.trim(),
        name: values.name.trim(),
        process: values.process,
        post_over: values.post_over,
        assignment_link: values.assignment_link.trim(),
        designation: values.designation,
        active_status: values.active_status,
        emp_type: values.emp_type,
        ctc: values.ctc,
        account: values.account
      };

      const response = await fetch('https://api.trollgold.org/automateListing', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOaXRlc2giLCJleHAiOjE3MzIzNTE3NzF9.lNWsDxvOoFh80hBKa4A-1PcejPiW0958sZo8MmbOz1k`
        },
        body: JSON.stringify(formattedValues)
      });

      if (response.ok) {
        form.resetFields();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Automate Listing</h1>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center bg-[#4B8BF4] text-white border-none hover:bg-blue-600"
          >
            Back
          </Button>
        </div>

        <div className="bg-[#1e2536] rounded-xl p-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-2 gap-x-6 gap-y-4"
          >
            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Listing Number
              </label>
              <Form.Item name="listing" className="mb-0">
                <Input 
                  placeholder="e.g., 123"
                  className="h-[45px] rounded-xl bg-white border-0"
                />
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Listing Name
              </label>
              <Form.Item name="listing_name" className="mb-0">
                <Input 
                  placeholder="Enter listing name"
                  className="h-[45px] rounded-xl bg-white border-0"
                />
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Project Name
              </label>
              <Form.Item name="name" className="mb-0">
                <Input 
                  placeholder="Enter project name"
                  className="h-[45px] rounded-xl bg-white border-0"
                />
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Process
              </label>
              <Form.Item name="process" className="mb-0">
                <Select
                  placeholder="Assignment"
                  className="h-[45px] !rounded-xl"
                  popupClassName="rounded-xl"
                >
                  <Option value="assignment">Assignment</Option>
                  <Option value="review">Review</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Post Over
              </label>
              <Form.Item name="post_over" className="mb-0">
                <Select
                  placeholder="Startupathon"
                  className="h-[45px] !rounded-xl"
                  popupClassName="rounded-xl"
                >
                  <Option value="startupathon">Startupathon</Option>
                  <Option value="normal">Normal</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Assignment Link
              </label>
              <Form.Item name="assignment_link" className="mb-0">
                <Input 
                  placeholder="www.example.com"
                  className="h-[45px] rounded-xl bg-white border-0"
                />
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Designation
              </label>
              <Form.Item name="designation" className="mb-0">
                <Select
                  placeholder="Intern"
                  className="h-[45px] !rounded-xl"
                  popupClassName="rounded-xl"
                >
                  <Option value="intern">Intern</Option>
                  <Option value="employee">Employee</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Employment Type
              </label>
              <Form.Item name="emp_type" className="mb-0">
                <Select
                  placeholder="Job"
                  className="h-[45px] !rounded-xl"
                  popupClassName="rounded-xl"
                >
                  <Option value="job">Job</Option>
                  <Option value="itn">Internship</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> CTC
              </label>
              <Form.Item name="ctc" className="mb-0">
                <Input 
                  placeholder="e.g., 10,000"
                  className="h-[45px] rounded-xl bg-white border-0"
                />
              </Form.Item>
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">
                <span className="text-red-500">*</span> Account
              </label>
              <Form.Item name="account" className="mb-0">
                <Select
                  placeholder="PV"
                  className="h-[45px] !rounded-xl"
                  popupClassName="rounded-xl"
                >
                  <Option value="pv">PV</Option>
                  <Option value="sa">SA</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-white text-sm">Active Status</label>
              <Form.Item name="active_status" className="mb-0">
                <Switch defaultChecked />
              </Form.Item>
            </div>

            <Button 
              type="primary"
              htmlType="submit"
              loading={loading}
              className="col-span-2 h-[45px] bg-[#4B8BF4] hover:bg-blue-600 rounded-xl border-0"
            >
              Automate Listing
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AutomateListing;