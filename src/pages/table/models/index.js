import * as api from '../services';
import { message } from 'antd';

export default {
    namespace: 'table',
    state: {
        list: [],
        loading: false,
        total: null,
        page: 1,
        limit: 5
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
    },
    effects: {
        *getList({ payload: { limit, page } }, { call, put, select }) {
            const table = yield select(state => state.table);
            const { data } = yield call(api.getList, { limit: limit ? limit : table.limit, page: page ? page : table.page });
            if (data.code === 0) {
                if (table.page === 1 && table.limit === 5) {
                    yield put({
                        type: 'save',
                        payload: {
                            list: [{
                                key: '1',
                                name: 'John',
                                age: 32,
                                sex: 'Male',
                                address: 'New York No. 1 Lake Park',
                            },
                            {
                                key: '2',
                                name: 'Marry',
                                age: 42,
                                sex: 'Female',
                                address: 'London No. 5 Lake Park',
                            },
                            {
                                key: '3',
                                name: 'Joe',
                                age: 32,
                                sex: 'Male',
                                address: 'Sidney No. 1 Lake Park',
                            },
                            {
                                key: '4',
                                name: 'Jeoge',
                                age: 42,
                                sex: 'Male',
                                address: 'London No. 1 Lake Park',
                            },
                            {
                                key: '5',
                                name: 'Linda',
                                age: 32,
                                sex: 'Female',
                                address: 'Sidney No. 4 Lake Park',
                            }],
                            page: 1,
                            limit: 5,
                            total: 6,
                        }
                    })
                } else if (table.page === 2 && table.limit === 5) {
                    yield put({
                        type: 'save',
                        payload: {
                            list: [{
                                key: '6',
                                name: 'Smith',
                                age: 43,
                                sex: 'Male',
                                address: 'Sidney No. 10 Lake Park',
                            }],
                            page: 2,
                            limit: 5,
                            total: 6,
                        }
                    })
                } else{
                    yield put({
                        type: 'save',
                        payload: {
                            list: [{
                                key: '1',
                                name: 'John',
                                age: 32,
                                sex: 'Male',
                                address: 'New York No. 1 Lake Park',
                            },
                            {
                                key: '2',
                                name: 'Marry',
                                age: 42,
                                sex: 'Female',
                                address: 'London No. 5 Lake Park',
                            },
                            {
                                key: '3',
                                name: 'Joe',
                                age: 32,
                                sex: 'Male',
                                address: 'Sidney No. 1 Lake Park',
                            },
                            {
                                key: '4',
                                name: 'Jeoge',
                                age: 42,
                                sex: 'Male',
                                address: 'London No. 1 Lake Park',
                            },
                            {
                                key: '5',
                                name: 'Linda',
                                age: 32,
                                sex: 'Female',
                                address: 'Sidney No. 4 Lake Park',
                            },{
                                key: '6',
                                name: 'Smith',
                                age: 43,
                                sex: 'Male',
                                address: 'Sidney No. 10 Lake Park',
                            }],
                            page: 1,
                            limit: table.limit,
                            total: 6,
                        }
                    })
                }
            } else {
                message.error(data.msg)
            }
            yield put({
                type: 'save',
                payload: {
                    loading: false,
                }
            });
        },
        *changePaginationProps({ payload: { limit, page } }, { select, put }) {
            const table = yield select((state) => state.table);
            yield put({
                type: 'save',
                payload: {
                    limit: limit ? limit : table.limit,
                    page: page ? page : table.page
                }
            })
            yield put({
                type: 'getList',
                payload: {}
            })
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/table') {
                    dispatch({
                        type: 'save',
                        payload: {
                            list: [],
                            total: null,
                            page: 1,
                            limit: 5,
                            loading: false,
                        }
                    });
                    dispatch({
                        type: 'getList',
                        payload: {},
                    })
                }
            });
        },
    },
};