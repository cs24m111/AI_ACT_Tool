from datetime import datetime
from bson import ObjectId

class ComplianceCheck:
    """Model for storing compliance check results in MongoDB"""

    @staticmethod
    def create(company_name, questionnaire_data, validation_result):
        return {
            'company_name': company_name,
            'questionnaire': questionnaire_data,
            'validation_result': validation_result,
            'created_at': datetime.utcnow(),
            'status': 'completed'
        }

    @staticmethod
    def to_dict(doc):
        """Convert MongoDB document to dict"""
        if doc:
            doc['_id'] = str(doc['_id'])
            if 'created_at' in doc:
                doc['created_at'] = doc['created_at'].isoformat()
        return doc


class Evidence:
    """Model for storing evidence records"""

    @staticmethod
    def create(check_id, evidence_type, data, file_path=None):
        return {
            'check_id': check_id,
            'evidence_type': evidence_type,  # 'metadata', 'screenshot', 'policy_scan'
            'data': data,
            'file_path': file_path,
            'created_at': datetime.utcnow()
        }

    @staticmethod
    def to_dict(doc):
        """Convert MongoDB document to dict"""
        if doc:
            doc['_id'] = str(doc['_id'])
            if 'created_at' in doc:
                doc['created_at'] = doc['created_at'].isoformat()
        return doc
