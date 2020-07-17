import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import Markdown from '../components/markdown/Markdown';
import { SECTION_LABELS } from '../../content/ordering';
import { graphqlToModuleInfo } from '../utils';
import SEO from '../components/seo';
import ModuleLayout from '../components/ModuleLayout/ModuleLayout';

export default function Template(props) {
  const { mdx } = props.data; // data.markdownRemark holds your post data
  const { body } = mdx;
  const module = React.useMemo(() => graphqlToModuleInfo(mdx), [mdx]);
  return (
    <Layout>
      <SEO
        title={`${module.title} (${SECTION_LABELS[module.division]})`}
        description={module.description}
      />

      <div className="h-screen flex overflow-hidden bg-white">
        <ModuleLayout module={module}>
          <div className="py-4">
            <Markdown body={body} />
          </div>
        </ModuleLayout>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query($id: String!) {
    mdx(frontmatter: { id: { eq: $id } }) {
      body
      frontmatter {
        title
        author
        id
        prerequisites
        description
        frequency
      }
      fields {
        division
      }
      toc {
        cpp {
          depth
          value
          slug
        }
        java {
          depth
          value
          slug
        }
        py {
          depth
          value
          slug
        }
      }
    }
  }
`;
