import { Form, Button, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  createOperation,
  updateOperation,
  getOperation,
} from "../../api/operations";

export default function OperationForm() {
  const [form] = Form.useForm(); // ✅ correcto
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getOperation(id).then(({ data }) => {
        form.setFieldsValue(data);
      });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    if (id) {
      await updateOperation(id, values);
    } else {
      await createOperation(values);
    }

    navigate("/operations");
  };

  return (
    <Form
      form={form} // ✅ importante
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item name="status" label="Status">
        <Select
          options={[
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
          ]}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
}
