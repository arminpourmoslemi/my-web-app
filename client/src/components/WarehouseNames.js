// client/src/components/WarehouseNames.js
import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Select, message, Dropdown, Menu } from 'antd';
import * as XLSX from 'xlsx';
import 'antd/dist/antd.css';
import customExcelIcon from '../assets/excel-icon.png';

const { Option } = Select;

function WarehouseNames() {
  const [warehouses, setWarehouses] = useState([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [manager, setManager] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  // رفرنس برای input فایل اکسل (مخفی)
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/warehouse');
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error('خطا در دریافت انبارها:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setCode('');
    setManager('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await fetch(`http://localhost:5000/api/warehouse/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, code, manager })
        });
        if (response.ok) {
          setEditingId(null);
          resetForm();
          fetchWarehouses();
          message.success('انبار با موفقیت ویرایش شد');
        }
      } else {
        const response = await fetch('http://localhost:5000/api/warehouse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, code, manager })
        });
        if (response.ok) {
          resetForm();
          fetchWarehouses();
          message.success('انبار با موفقیت ایجاد شد');
        }
      }
    } catch (error) {
      console.error('خطا در ایجاد/ویرایش انبار:', error);
      message.error('خطا در ایجاد/ویرایش انبار');
    }
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setName(record.name);
    setCode(record.code);
    setManager(record.manager);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('آیا از حذف این انبار مطمئن هستید؟');
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:5000/api/warehouse/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchWarehouses();
        message.success('انبار حذف شد');
      }
    } catch (error) {
      console.error('خطا در حذف انبار:', error);
      message.error('خطا در حذف انبار');
    }
  };

  // خروجی اکسل
  const handleExportExcel = () => {
    const exportData = warehouses.map(item => ({
      'نام انبار': item.name,
      'کد انبار': item.code,
      'انباردار': item.manager
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData, {
      header: ['نام انبار', 'کد انبار', 'انباردار']
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "انبارها");
    XLSX.writeFile(workbook, "warehouses.xlsx");
  };

  // ورودی اکسل
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // فرض می‌کنیم ستون‌ها: 'نام انبار', 'کد انبار', 'انباردار'
      data.forEach(async (item) => {
        try {
          await fetch('http://localhost:5000/api/warehouse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: item['نام انبار'],
              code: item['کد انبار'],
              manager: item['انباردار']
            })
          });
        } catch (error) {
          console.error('خطا در import رکورد:', error);
        }
      });
      setTimeout(() => {
        fetchWarehouses();
        message.success('داده‌ها با موفقیت وارد شدند');
      }, 1000);
    };
    reader.readAsBinaryString(file);
  };

  // منوی اکسل (فقط Import/Export)
  const excelMenu = (
    <Menu>
      <Menu.Item key="import" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        وارد کردن اکسل
      </Menu.Item>
      <Menu.Item key="export" onClick={handleExportExcel}>
        خروجی اکسل
      </Menu.Item>
    </Menu>
  );

  // ستون‌های جدول
  const columns = [
    {
      title: 'نام انبار',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'کد انبار',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'انباردار',
      dataIndex: 'manager',
      key: 'manager',
      sorter: (a, b) => a.manager.localeCompare(b.manager),
    },
    {
      title: 'عملیات',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: '0.5rem' }}>
            ویرایش
          </Button>
          <Button onClick={() => handleDelete(record._id)} danger>
            حذف
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h2>فرم ورود اطلاعات انبار</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#f9f9f9',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>نام انبار:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>کد انبار:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label>انباردار:</label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          {editingId ? 'ویرایش' : 'ثبت'}
        </Button>
      </form>

      {/* منوی اکسل با ایکون سفارشی */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <Dropdown overlay={excelMenu} trigger={['click']}>
          <Button type="default" style={{ padding: '0.5rem' }}>
            <img src={customExcelIcon} alt="Excel" style={{ width: '24px', height: '24px' }} />
          </Button>
        </Dropdown>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImportExcel}
        />
      </div>

      {/* انتخاب تعداد ردیف در صفحه */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ marginLeft: '0.5rem' }}>تعداد ردیف در صفحه:</span>
        <Select
          defaultValue="10"
          style={{ width: 120 }}
          onChange={(value) => setPageSize(Number(value))}
        >
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
        </Select>
      </div>

      <h2>لیست انبارها</h2>
      <Table
        columns={columns}
        dataSource={warehouses}
        rowKey="_id"
        pagination={{ pageSize, pageSizeOptions: ['10', '20', '50'], showSizeChanger: true }}
        style={{ background: '#fff' }}
      />
    </div>
  );
}

export default WarehouseNames;
