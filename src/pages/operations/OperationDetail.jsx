import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Descriptions } from "antd";
import axios from "axios";

export default function OperationDetail() {
  const { id } = useParams();
  const [operation, setOperation] = useState(null);

  useEffect(() => {
    loadOperation();
  }, []);

  const loadOperation = async () => {
    const { data } = await axios.get(
      `https://api-node-docker.onrender.com/api/operations/${id}`
    );
    setOperation(data);
  };

  if (!operation) return null;

  return (
    <Card title="Operation Detail">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Status">
          {operation.status}
        </Descriptions.Item>
        <Descriptions.Item label="Booking">
          {operation.booking?.number}
        </Descriptions.Item>
        <Descriptions.Item label="Line">
          {operation.booking?.line?.name}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
