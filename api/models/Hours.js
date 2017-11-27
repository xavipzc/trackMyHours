/**
 * Hours.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'localMysqlServer',
  tableName: 'times',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    start: {
      type: 'datetime',
      columnName: 'start_at'
    },
    end: {
      type: 'datetime',
      columnName: 'end_at'
    },
    user: {
      type: 'integer',
      columnName: 'user_id'
    }
  }
  
};

