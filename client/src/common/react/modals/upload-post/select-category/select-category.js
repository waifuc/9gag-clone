import React, { Fragment } from "react";
import classnames from "classnames";
import * as yup from "yup";

import { KComponent } from "../../../../../components/KComponent";
import SectionPicker from "../../../../react/section-picker/section-picker";
import { modals } from "../../modals";
import { categoryCache } from "../../../../cache/api-cache/common-cache";
import { InputBase } from "../../../input-base/input-base";
import { uploadPostModal } from "../upload-post";

import { LoadingInline } from "../../../loading-inline/loading-inline";

export class SelectCategoryModal extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null
    };
  }

  handleServerError = () => {
    const { error } = this.state;
    const message = error.message;
    let errMatcher = {
      invalid_url: "Invalid URL.",
      invalid_picture: "Unsupported image",
      network_error: "Database is ded."
    };
    return errMatcher.hasOwnProperty(message)
      ? errMatcher[message]
      : "Something bad happened.";
  };

  render() {
    let { onClose, onUploadSuccess } = this.props;
    let { loading, error, categories } = this.state;
    return (
      <div className={classnames("selecting-category-modal")}>
        <Fragment>
          <div className="modal-header selecting-category-modal-header no-border">
            <div className="modal-title ">
              <h4 className="modal-title-text">Pick a section</h4>
              <p className="modal-subtitle-text">
                Submitting to the right section to make sure your post gets the
                right exposure it deserves!
              </p>
            </div>
            <i className="fas fa-times close-modal" onClick={() => onClose()} />
          </div>
          <div className="modal-body selecting-category-modal-body">
            {loading ? <LoadingInline /> : null}
            <SectionPicker data={categoryCache.syncGet()} />
            {this.state.error && (
              <div className="server-error">{this.handleServerError()}</div>
            )}
          </div>
          <div className="modal-footer selecting-category-modal-footer no-border">
            <button
              className="btn btn-secondary"
              onClick={this.handleBackClicked}
            >
              Back
            </button>
            <button className="btn btn-primary" disabled={!true}>
              {loading ? "Loading" : "Next"}
            </button>
          </div>
        </Fragment>
      </div>
    );
  }
}

export const selectCategoryModal = {
  open(handlePost, data) {
    const modal = modals.openModal({
      content: (
        <SelectCategoryModal
          onClose={() => modal.close()}
          onUploadSuccess={() => {
            modal.close();
            handlePost();
          }}
          data={data}
        />
      )
    });
    return modal.result;
  }
};