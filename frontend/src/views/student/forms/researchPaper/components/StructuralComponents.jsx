import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt, faBook, faUsers, faUniversity, faIdBadge,
    faAlignLeft, faPlay, faBookOpen, faFlask, faChartBar,
    faComments, faFlagCheckered, faBookmark, faHashtag,
    faLink, faBalanceScale
} from "@fortawesome/free-solid-svg-icons";
const StructuralComponents = () => {
  return (
    <div>
        {/* Structural Components */}
                        <div className="form-section">
                            <h3>
                                <FontAwesomeIcon icon={faFileAlt} /> Structural Components
                            </h3>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faPlay} /> Introduction
                                    </label>
                                    <textarea rows="4"></textarea>
                                </div>
        
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faBookOpen} /> Literature Review
                                    </label>
                                    <textarea rows="4"></textarea>
                                </div>
        
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faFlask} /> Methodology
                                    </label>
                                    <textarea rows="4"></textarea>
                                </div>
        
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faChartBar} /> Results
                                    </label>
                                    <textarea rows="4"></textarea>
                                </div>
        
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faComments} /> Discussion
                                    </label>
                                    <textarea rows="4"></textarea>
                                </div>
        
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faFlagCheckered} /> Conclusion
                                    </label>
                                    <textarea rows="4"></textarea>
                                </div>
                            </div>
                        </div>
        
    </div>
  )
}

export default StructuralComponents