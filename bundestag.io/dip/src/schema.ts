import { gql } from 'apollo-server'
export default gql`
type Query {
  procedures(offset: Int, limit: Int): [Procedure]
}
scalar Date

type Procedure {
  procedureId: ID!
  title: String!
  abstract: String
  currentStatus: String
  type: String
  period: Int
  initiative: [String]
  date: Date
  subjectGroups: [String]
  tags: [String]
}
`
