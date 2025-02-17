 import Reactory from '@reactory/reactory-core';
import { fileAsString } from '@reactory/server-core/utils/io';

 const mutationVariables = {
  'formData.slug': 'createInput.slug',
  'formData.title': 'createInput.title',
  'formData.content': 'createInput.content',
  'formData.published': 'createInput.published',
  'formData.topics': 'createInput.topics'
}

 const graphql: Reactory.Forms.IFormGraphDefinition = {
   query: {
     name: 'ReactoryGetContentBySlug',
     text: fileAsString(require.resolve('./ReactoryGetContentBySlug.graphql')),
     variables: {
       'formData.slug': 'slug',       
     },
     resultMap: {
       'id': 'id',
       'createdAt': 'createdAt',
       'title': 'title',
       'content': 'content',
       'slug': 'slug',
       'published': 'published',
       'topics': 'topics'
     },
     edit: false,
     new: false,
   },
   mutation: {
     new: {
       name: 'ReactoryCreateContent',
       text: fileAsString(require.resolve('./ReactoryCreateContent.graphql')),
       objectMap: true,
       updateMessage: 'Creating Entry ...',
       // @ts-ignore
       variables: mutationVariables,      
       onSuccessMethod: 'refresh',
       notification: { 
        inAppNotification: true,
        title: 'Content Created',
        type: 'success',
       },
     },
     edit: {
       name: 'ReactoryCreateContent',
       text: fileAsString(require.resolve('./ReactoryCreateContent.graphql')),
       objectMap: true,
       updateMessage: 'Updating Content ...',
       // @ts-ignore
       variables: mutationVariables,
       onSuccessMethod:  'refresh',
       notification: { 
        inAppNotification: true,
        title: 'Content Updated',
        type: 'success',
       },
       mergeStrategy: 'function'
     },
   },
 };

 export default graphql;