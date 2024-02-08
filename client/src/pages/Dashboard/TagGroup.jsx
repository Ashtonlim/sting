import { useState } from "react";
import { Tag } from "antd";

const TagGroup = ({ groups = [] }) => {
  // console.log("groups", groups);
  const [tags, setTags] = useState(groups || []);

  const forMap = (tag) => {
    const tagElem = <Tag>{tag}</Tag>;
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);

  return (
    <>
      <div className="mb-3">{tagChild}</div>
    </>
  );
};
export default TagGroup;
