import { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import {
  getOperations,
  deleteOperation,
} from "../../api/operations";
import { Link } from "react-router-dom";

export default function Operations() {
  const [operations, setOperations] = useState([]);

  const loadOperations = async () => {
    const { data } = await getOperations();
    setOperations(data);
  };

  useEffect(() => {
    loadOperations();
  }, []);

  const handleDelete = async (id) => {
    await deleteOperation(id);
    loadOperations();
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Booking",
      render: (_, record) => (
        <Link to={`/bookings/${record.booking?._id}`}>
          {record.booking?.number}
        </Link>
      ),
    },
    {
      title: "Line",
      render: (_, record) => (
        <Link to={`/lines/${record.booking?.line?._id}`}>
          {record.booking?.line?.name}
        </Link>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Link to={`/operations/edit/${record._id}`}>
            <Button type="primary">Edit</Button>
          </Link>

          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Link to="/operations/create">
        <Button type="primary" style={{ marginBottom: 20 }}>
          Create Operation
        </Button>
      </Link>

      <Table
        columns={columns}
        dataSource={operations}
        rowKey="_id"
      />
    </>
  );
}
