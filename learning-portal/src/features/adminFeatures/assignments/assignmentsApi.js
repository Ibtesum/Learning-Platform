import { apiSlice } from "../../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => `/assignments`,
    }),
    getAssignment: builder.query({
      query: (vTitle) => `/assignments/${vTitle}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              draft.push(data);
            }
          )
        );
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              return draft.filter((task) => task.id != id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    // getMoreConversations: builder.query({
    //   query: ({ email, page }) =>
    //     `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
    //   async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
    //     try {
    //       const conversations = await queryFulfilled;
    //       if (conversations?.data?.length > 0) {
    //         // update conversation cache pessimistically start
    //         dispatch(
    //           apiSlice.util.updateQueryData(
    //             "getConversations",
    //             email,
    //             (draft) => {
    //               return {
    //                 data: [...draft.data, ...conversations.data],
    //                 totalCount: Number(draft.totalCount),
    //               };
    //             }
    //           )
    //         );
    //         // update messages cache pessimistically end
    //       }
    //     } catch (err) {}
    //   },
    // }),
    // getConversation: builder.query({
    //   query: ({ userEmail, participantEmail }) =>
    //     `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    // }),
    // addConversation: builder.mutation({
    //   query: ({ sender, data }) => ({
    //     url: "/conversations",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     const conversation = await queryFulfilled;
    //     if (conversation?.data?.id) {
    //       // silent entry to message table
    //       const users = arg.data.users;
    //       const senderUser = users.find((user) => user.email === arg.sender);
    //       const receiverUser = users.find((user) => user.email !== arg.sender);

    //       dispatch(
    //         messagesApi.endpoints.addMessage.initiate({
    //           conversationId: conversation?.data?.id,
    //           sender: senderUser,
    //           receiver: receiverUser,
    //           message: arg.data.message,
    //           timestamp: arg.data.timestamp,
    //         })
    //       );
    //     }
    //   },
    // }),
    // editConversation: builder.mutation({
    //   query: ({ id, data, sender }) => ({
    //     url: `/conversations/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     // optimistic cache update start
    //     const pathResult = dispatch(
    //       apiSlice.util.updateQueryData(
    //         "getConversations",
    //         arg.sender,
    //         (draft) => {
    //           const draftConversation = draft.data.find((c) => c.id == arg.id);
    //           draftConversation.message = arg.data.message;
    //           draftConversation.timestamp = arg.data.timestamp;
    //         }
    //       )
    //     );
    //     // optimistic cache update end

    //     try {
    //       const conversation = await queryFulfilled;
    //       if (conversation?.data?.id) {
    //         // silent entry to message table
    //         const users = arg.data.users;
    //         const senderUser = users.find((user) => user.email === arg.sender);
    //         const receiverUser = users.find(
    //           (user) => user.email !== arg.sender
    //         );

    //         const res = await dispatch(
    //           messagesApi.endpoints.addMessage.initiate({
    //             conversationId: conversation?.data?.id,
    //             sender: senderUser,
    //             receiver: receiverUser,
    //             message: arg.data.message,
    //             timestamp: arg.data.timestamp,
    //           })
    //         ).unwrap();

    //         // update messages cache pessimistically start
    //         dispatch(
    //           apiSlice.util.updateQueryData(
    //             "getMessages",
    //             res.conversationId.toString(),
    //             (draft) => {
    //               draft.push(res);
    //             }
    //           )
    //         );
    //         // update messages cache pessimistically end
    //       }
    //     } catch (err) {
    //       pathResult.undo();
    //     }
    //   },
    // }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  //   useGetConversationQuery,
  //   useAddConversationMutation,
  //   useEditConversationMutation,
} = assignmentsApi;
