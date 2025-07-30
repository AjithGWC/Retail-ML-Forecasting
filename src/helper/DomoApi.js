import domo from "ryuu.js";
import Download from "downloadjs";

const BASE_URL = "/domo/datastores/v1";

const GetCurrentUser = () => {
  return domo
    .get("/domo/environment/v1")
    .then((user) => ({
      ...user,
      displayName: user.userName,
      avatarKey: `/domo/avatars/v2/USER/${user.userId}`,
    }))
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const GetGroups = () => {
  return domo
    .get(`/domo/groups/v1`)
    .then((user) => user)
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const GetUser = (userId) => {
  return domo
    .get(`/domo/users/v1/${userId}?includeDetails=true`)
    .then((user) => ({ ...user, userName: user.displayName }))
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const CreateDocument = (collectionName, document) => {
  return domo
    .post(`${BASE_URL}/collections/${collectionName}/documents/`, {
      content: document,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const ListDocuments = (collectionName) => {
  return domo
    .get(`${BASE_URL}/collections/${collectionName}/documents/`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error listing documents:", error);
      throw error;
    });
};

const GetDocument = (collectionName, documentId) => {
  return domo
    .get(`${BASE_URL}/collections/${collectionName}/documents/${documentId}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error getting document:", error);
      throw error;
    });
};

const UpdateDocument = (collectionName, documentId, document) => {
  return domo
    .put(`${BASE_URL}/collections/${collectionName}/documents/${documentId}`, {
      content: document,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating document:", error);
      throw error;
    });
};

const DeleteDocument = (collectionName, documentId) => {
  return domo
    .delete(`${BASE_URL}/collections/${collectionName}/documents/${documentId}`)
    .then((response) => response.data || response)
    .catch((error) => {
      console.error("Error deleting document:", error);
      throw error;
    });
};

const BulkDeleteDocuments = (collectionName, ids) => {
  return domo
    .delete(`${BASE_URL}/collections/${collectionName}/documents/bulk`, {
      params: { ids },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error bulk deleting documents:", error);
      throw error;
    });
};

const UploadFile = (file, name, description = "", isPublic = false) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `/domo/data-files/v1?name=
             ${name}&description=${description}&public=${isPublic}`;
  const options = { contentType: "multipart" };
  return domo
    .post(url, formData, options)
    .then((response) => response)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const UploadRevision = (file, fileId) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `/domo/data-files/v1/${fileId}`;
  const options = { contentType: "multipart" };
  return domo
    .put(url, formData, options)
    .then((response) => response)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const DownloadFile = (fileId, filename, revisionId) => {
  const options = { responseType: "blob" };
  const url = `/domo/data-files/v1/${fileId}${
    revisionId ? `/revisions/${revisionId}` : ""
  }`;
  return domo
    .get(url, options)
    .then((data) => {
      Download(data, filename);
    })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const GetFile = (fileId, revisionId) => {
  const options = { responseType: "blob" };
  const url = `/domo/data-files/v1/${fileId}${
    revisionId ? `/revisions/${revisionId}` : ""
  }`;
  return domo
    .get(url, options)
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

/**
 * Queries documents from a specified collection with optional aggregation and pagination.
 *
 * @param {string} collectionName - The collection to query.
 * @param {object} query - The query filter.
 * @param {object} aggregations - Aggregation options (e.g., `groupby`, `count`, `avg`).
 * @param {object} options - Pagination and sorting options (`orderby`, `limit`, `offset`).
 * @returns {Promise<object>} - The query result.
 *
 * @example
 * // Fetch documents from "SalesData" where status is "active" and createdOn is within the past year
 * const query = {
 *     "status": "active",
 *     "createdOn": { "$gte": { "$date": "2024-01-01T00:00:00.000Z" } }
 * };
 *
 * const aggregations = {
 *     "groupby": ["region"],
 *     "count": "salesCount",
 *     "avg": { "amount": "avgSalesAmount" }
 * };
 *
 * const options = {
 *     "orderby": "createdOn descending",
 *     "limit": 1000,
 *     "offset": 0
 * };
 *
 * queryDocumentsWithAggregations("SalesData", query, aggregations, options)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error));
 */
const queryDocumentsWithAggregations = (
  collectionName,
  query = {},
  aggregations = {},
  options = {}
) => {
  let url = `${BASE_URL}/collections/${collectionName}/documents/query?`;

  // Helper function to format aggregation parameters
  const formatAggregationParams = (params) => {
    return Object.entries(params)
      .map(([property, alias]) => `${property} ${alias}`)
      .join(", ");
  };

  // Append aggregation parameters to URL
  if (aggregations.groupby) url += `groupby=${aggregations.groupby.join(",")}&`;
  if (aggregations.count) url += `count=${aggregations.count}&`;
  if (aggregations.avg)
    url += `avg=${formatAggregationParams(aggregations.avg)}&`;
  if (aggregations.min)
    url += `min=${formatAggregationParams(aggregations.min)}&`;
  if (aggregations.max)
    url += `max=${formatAggregationParams(aggregations.max)}&`;
  if (aggregations.sum)
    url += `sum=${formatAggregationParams(aggregations.sum)}&`;
  if (aggregations.unwind) url += `unwind=${aggregations.unwind.join(",")}&`;

  // Append pagination and sorting options
  if (options.orderby) url += `orderby=${options.orderby}&`;
  if (options.limit !== undefined) url += `limit=${options.limit}&`;
  if (options.offset !== undefined) url += `offset=${options.offset}&`;

  // Remove trailing '&' or '?' from the URL
  url = url.replace(/[&?]$/, "");

  return domo
    .post(url, query)
    .then((response) => response)
    .catch((error) => {
      console.error("Error querying documents with aggregations:", error);
      throw error;
    });
};

const CreateDocumentsInBulk = (collectionName, documents) => {
  return domo
    .post(`${BASE_URL}/collections/${collectionName}/documents/bulk`, documents)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error creating documents in bulk:", error);
      throw error;
    });
};

const partialupdateDocument = (collectionName, query, operation) => {
  const requestBody = {
    query: query,
    operation: operation,
  };

  return domo
    .put(
      `${BASE_URL}/collections/${collectionName}/documents/update`,
      requestBody
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error updating document:", error);
      throw error;
    });
};

const QueryDocument = (collectionName, query) => {
  return domo
    .post(`${BASE_URL}/collections/${collectionName}/documents/query `, query)
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating document:", error);
      throw error;
    });
};

const GetCurrentUserGroup = (userId) => {
  return domo
    .get(`/domo/groups/v1/user/${userId}`)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const downloadUplodedFile = async (fileId, fileName = "downloaded-file") => {
  try {
    const fileBlob = await DomoApi.GetFile(fileId);
    const fileUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(fileUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
const getData = (alias, queryOperators = "") => {
  const BASE_URL = "/data/v1";

  const url = `${BASE_URL}/${alias}?${queryOperators}`;

  console.log("Request URL:", url);

  return domo
    .get(url)
    .then((response) => response)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

const DomoApi = {
  GetCurrentUser,
  GetGroups,
  GetUser,
  CreateDocument,
  ListDocuments,
  DeleteDocument,
  BulkDeleteDocuments,
  GetDocument,
  UpdateDocument,
  UploadFile,
  UploadRevision,
  DownloadFile,
  GetFile,
  queryDocumentsWithAggregations,
  CreateDocumentsInBulk,
  partialupdateDocument,
  QueryDocument,
  GetCurrentUserGroup,
  downloadUplodedFile,
  getData,
};

export default DomoApi;
