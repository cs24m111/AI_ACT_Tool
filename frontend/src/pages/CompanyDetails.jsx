import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCheck, getEvidence } from '../services/api';
import ResultCard from '../components/ResultCard';
import EvidenceList from '../components/EvidenceList';

function CompanyDetails() {
  const { id } = useParams();
  const [check, setCheck] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [checkResponse, evidenceResponse] = await Promise.all([
          getCheck(id),
          getEvidence(id),
        ]);

        if (checkResponse.success) {
          setCheck(checkResponse.data);
        }

        if (evidenceResponse.success) {
          setEvidence(evidenceResponse.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading compliance check...</p>
      </div>
    );
  }

  if (error || !check) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Error Loading Check
        </h2>
        <p className="text-gray-600 mb-6">{error || 'Check not found'}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {check.company_name}
          </h1>
          <p className="text-gray-600">
            Check performed on:{' '}
            {new Date(check.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="mb-8">
          <ResultCard result={check.validation_result} />
        </div>

        <EvidenceList evidence={evidence.map((e) => e.data)} />
      </div>
    </div>
  );
}

export default CompanyDetails;
