import { useFormik } from "formik";
import * as yup from "yup";
import { Stack, Button } from "@chakra-ui/react";
import InputField from "../InputField";
import { editPostServise } from "../../services/postsServices";
import PostBodyField from "./PostBodyField";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().min(3).max(100).required(),
  category: yup.string().oneOf(["news", "nature", "it"]).optional(),
  excerpt: yup.string().min(3).max(180).required(),
  image: yup.string().url().optional(),
  body: yup.string().min(3).required(),
});

function EditPostForm({ post }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      excerpt: "",
      image: "",
      body: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      editPostServise(post.id, values).then(() =>
        navigate(`/posts/${post.id}`)
      );
    },
  });

  const { resetForm } = formik;

  useEffect(() => {
    if (!post) {
      return;
    }

    resetForm({
      values: {
        title: post.title,
        category: post.category || "",
        excerpt: post.excerpt,
        image: post.image || "",
        body: post.body,
      },
    });
  }, [post, resetForm]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <InputField
          label="Title"
          placeholder="Title"
          required
          meta={formik.getFieldMeta("title")}
          {...formik.getFieldProps("title")}
        />
        <InputField
          label="Category"
          placeholder="Category"
          meta={formik.getFieldMeta("category")}
          {...formik.getFieldProps("category")}
        />
        <InputField
          label="Excerpt"
          placeholder="Excerpt"
          required
          meta={formik.getFieldMeta("excerpt")}
          {...formik.getFieldProps("excerpt")}
        />
        <InputField
          label="Image URL"
          placeholder="Image URL"
          type="url"
          meta={formik.getFieldMeta("image")}
          {...formik.getFieldProps("image")}
        />
        <PostBodyField
          label="Body"
          placeholder="Body"
          required
          meta={formik.getFieldMeta("body")}
          {...formik.getFieldProps("body")}
        />

        <Button type="submit" colorScheme="blue" isActive={!post}>
          Edit Post
        </Button>
      </Stack>
    </form>
  );
}

EditPostForm.propTypes = {
  post: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string,
  body: PropTypes.string.isRequired,
};

export default EditPostForm;
