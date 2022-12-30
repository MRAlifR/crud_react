import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {
	createUser,
	deleteUser,
	editUser,
	fetchUsers,
} from '../services/api/springApi';

import TableUser from './TableUser';

const { confirm } = Modal;
const UserPage = () => {
	
	//* Table
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchUserData();
	}, []);

	//* Modal
	const [createForm] = Form.useForm();
	const [showCreateModal, setshowCreateModal] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);

	const [editForm] = Form.useForm();
	const [showEditModal, setshowEditModal] = useState(false);
	const [editLoading, setEditLoading] = useState(false);

	const fetchUserData = async () => {
		setLoading(true);
		try {
			const users = await fetchUsers();
			setUsers(users);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	//* Delete Event
	const onClickDeleteButton = async (user) => {
		confirm({
			title: 'Are you sure you want to delete this user?',
			icon: <ExclamationCircleFilled />,
			content: 'This action cannot be undone.',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: async () => {
				await deleteUser(user);
				await fetchUserData();
			},
		});
		await fetchUserData();
	};

	//* Edit Event
	const onClickEditButton = (user) => {
		delete user.password;
		editForm.setFieldsValue(user);
		setshowEditModal(true);
	};

	const onSaveEditModal = async () => {
		setEditLoading(true);
		
		try {
			await editUser(editForm.getFieldValue());
		} catch (error) {
			console.log(error);
		}
		
		await fetchUserData();
		setEditLoading(false);
		setshowEditModal(false);
		editForm.resetFields();
	};

	const onCancelEditModal = () => {
		setshowEditModal(false);
		editForm.resetFields();
	};

	//* Create Event
	const onClickCreateButton = (user) => {
		createForm.setFieldsValue({ status: 'A' });
		setshowCreateModal(true);
	};

	const onSaveCreateModal = async () => {
		setCreateLoading(true);

		try {
			await createUser(createForm.getFieldValue());
		} catch (error) {
			console.log(error);
		}

		await fetchUserData();
		setCreateLoading(false);
		setshowCreateModal(false);
		createForm.resetFields();
	};

	const onCancelCreateModal = () => {
		setshowCreateModal(false);
		createForm.resetFields();
	};

	return (
		<div
			style={{
				background: '#F5F7FA',
				height: '100vh',
			}}>
			<PageContainer title='React CRUD'>
				<ProCard direction='column' ghost gutter={[0, 16]}>
					<ProCard
						title='User Management'
						extra={
							<Button
								key='1'
								type='primary'
								icon={<PlusOutlined />}
								onClick={onClickCreateButton}>
								Add User
							</Button>
						}>
						<Space
							direction='vertical'
							size='middle'
							style={{
								display: 'flex',
							}}>
							<TableUser
								users={users}
								loading={loading}
								onClickEdit={onClickEditButton}
								onClickDelete={onClickDeleteButton}
							/>
						</Space>
					</ProCard>
				</ProCard>
			</PageContainer>

			<Modal
				title='Create User'
				open={showCreateModal}
				onOk={onSaveCreateModal}
				okText='Save'
				cancelText='Cancel'
				confirmLoading={createLoading}
				onCancel={onCancelCreateModal}>
				<Form
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 12,
					}}
					form={createForm}
					autoComplete='off'>
					<Form.Item label='Nama Lengkap' name='namalengkap'>
						<Input />
					</Form.Item>

					<Form.Item label='Username' name='username'>
						<Input />
					</Form.Item>

					<Form.Item label='Password' name='password'>
						<Input.Password />
					</Form.Item>

					<Form.Item label='Status' name='status'>
						<Select
							style={{ width: 120 }}
							options={[
								{
									value: 'A',
									label: 'Active',
								},
								{
									value: 'I',
									label: 'Inactive',
								},
							]}
						/>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title='Edit User'
				open={showEditModal}
				onOk={onSaveEditModal}
				okText='Save'
				cancelText='Cancel'
				confirmLoading={editLoading}
				onCancel={onCancelEditModal}>
				<Form
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 12,
					}}
					form={editForm}
					autoComplete='off'>
					<Form.Item label='User ID' name='userid'>
						<Input disabled={true} />
					</Form.Item>
					<Form.Item label='Nama Lengkap' name='namalengkap'>
						<Input />
					</Form.Item>

					<Form.Item label='Username' name='username'>
						<Input />
					</Form.Item>

					<Form.Item label='Password' name='password'>
						<Input.Password />
					</Form.Item>

					<Form.Item label='Status' name='status'>
						<Select
							defaultValue='A'
							style={{ width: 120 }}
							options={[
								{
									value: 'A',
									label: 'Active',
								},
								{
									value: 'I',
									label: 'Inactive',
								},
							]}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default UserPage;
