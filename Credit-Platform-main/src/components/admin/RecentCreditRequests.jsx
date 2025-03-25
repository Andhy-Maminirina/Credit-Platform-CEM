"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiCalendar, FiClock, FiEye, FiEdit } from "react-icons/fi"

const RecentCreditRequests = ({ requests = [], onTabChange }) => {
  const [activeTab, setActiveTab] = useState("pending")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "approved":
        return "Approuvée"
      case "rejected":
        return "Refusée"
      default:
        return "Inconnue"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Demandes récentes</h3>
            <p className="text-sm text-gray-500">Liste des dernières demandes de crédit</p>
          </div>
          <Link to="/admin/credit-requests" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Voir tout
          </Link>
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => handleTabChange("pending")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "pending"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            En attente
          </button>
          <button
            onClick={() => handleTabChange("processing")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "processing"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            En traitement
          </button>
          <button
            onClick={() => handleTabChange("approved")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "approved"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Approuvées
          </button>
          <button
            onClick={() => handleTabChange("rejected")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "rejected"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Refusées
          </button>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center bg-gray-100 rounded-full">
            <FiClock size={24} />
          </div>
          <h3 className="mt-4 text-sm font-medium text-gray-900">Aucune demande</h3>
          <p className="mt-1 text-sm text-gray-500">
            Il n'y a pas de demandes{" "}
            {activeTab === "pending" ? "en attente" : activeTab === "approved" ? "approuvées" : "refusées"} pour le
            moment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type de crédit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Montant
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                        <span className="font-medium text-sm">
                          {request.client.firstName.charAt(0)}
                          {request.client.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.client.firstName} {request.client.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{request.client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                      {request.creditType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Intl.NumberFormat("fr-MG", { style: "currency", currency: "MGA" })
                      .format(request.amount)
                      .replace("MGA", "Ar")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" size={14} />
                      {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusClass(request.status)}`}
                    >
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/admin/credit-requests/${request.id}`} className="text-gray-500 hover:text-gray-700">
                        <FiEye size={18} />
                      </Link>
                      <Link
                        to={`/admin/credit-requests/${request.id}/edit`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <FiEdit size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{requests.length}</span>{" "}
            sur <span className="font-medium">{requests.length}</span> demandes
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Précédent
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentCreditRequests

