import { useState } from "react";
import { Tag } from "antd";

const TagGroup = ({ groups = [] }) => {
  // console.log("groups", groups);
  const [tags, setTags] = useState(groups || []);

  return (
    <>
      <div className="mb-3">
        {tags &&
          tags.map((tag) => {
            return (
              <Tag className="inline" key={tag}>
                {tag}
              </Tag>
            );
          })}
      </div>
    </>
  );
};
export default TagGroup;
