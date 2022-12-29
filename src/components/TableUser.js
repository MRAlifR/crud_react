import { Button, Space, Table, Tag } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

import React from 'react';
const { Column } = Table;

const TableUser = ({ users, loading, onClickEdit, onClickDelete }) => {
	return (
		<>
			<Table dataSource={users} rowKey='userid' loading={loading}>
				<Column
					title='Nama Lengkap'
					dataIndex='namalengkap'
					key='namalengkap'
				/>
				<Column title='Username' dataIndex='username' key='username' />
				<Column title='Password' dataIndex='password' key='password' />
				<Column
					title='Status'
					dataIndex='status'
					key='status'
					align='center'
					render={(text) =>
						text === 'A' ? (
							<Tag color='green'>Active</Tag>
						) : (
							<Tag color='red'>Inactive</Tag>
						)
					}
				/>
				<Column
					title='Action'
					key='action'
					align='center'
					render={(_, user) => {
						return (
							<Space size='small'>
								<Button
									icon={<FormOutlined />}
									onClick={() => onClickEdit(user)}
								/>
								<Button
									icon={<DeleteOutlined />}
									danger
									onClick={() => onClickDelete(user)}
								/>
							</Space>
						);
					}}
				/>
			</Table>
		</>
	);
};

export default TableUser;
