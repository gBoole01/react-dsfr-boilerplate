import CurrentUser from '@src/models/CurrentUser';
import EditUserDTO from '@src/models/dto/EditUserDTO';
import { api } from '@store/api';
import { setCurrentUser } from '../auth/authSlice';

const USER_ENDPOINT = 'users';

export const userAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        updateUserById: builder.mutation<CurrentUser, EditUserDTO>({
            query: (user) => ({
                url: `${USER_ENDPOINT}`,
                method: 'PUT',
                body: user,
            }),

            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result) {
                        dispatch(setCurrentUser(result.data));
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export const { useUpdateUserByIdMutation } = userAPI;
