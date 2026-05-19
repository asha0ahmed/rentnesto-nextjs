'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { propertyAPI } from '../../../../services/api';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { useToast } from '../../../../context/ToastContext';
import './PropertyForm.css';

const EditPropertyContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    division: 'Dhaka',
    district: '',
    address: '',
    rentAmount: '',
    rentPeriod: 'monthly',
    bedrooms: '',
    bathrooms: '',
    sizeValue: '',
    sizeUnit: 'sqft',
    furnished: 'unfurnished',
    amenities: '',
    newImages: [],
    newImagePreviews: [],
    existingPhotoUrls: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    minimumStay: '',
    securityDeposit: '',
    utilitiesIncluded: false,
    petsAllowed: false,
    smokingAllowed: false,
    additionalRules: ''
  });

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line
  }, [id]);

  const fetchProperty = async () => {
    setFetchLoading(true);
    setError('');

    try {
      const response = await propertyAPI.getPropertyById(id);
      const property = response.data.data.property;

      setFormData({
        title: property.title || '',
        description: property.description || '',
        propertyType: property.propertyType || 'apartment',
        division: property.location?.division || 'Dhaka',
        district: property.location?.district || '',
        address: property.location?.address || '',
        rentAmount: property.rent?.amount || '',
        rentPeriod: property.rent?.period || 'monthly',
        bedrooms: property.features?.bedrooms || '',
        bathrooms: property.features?.bathrooms || '',
        sizeValue: property.features?.size?.value || '',
        sizeUnit: property.features?.size?.unit || 'sqft',
        furnished: property.features?.furnished || 'unfurnished',
        amenities: property.amenities ? property.amenities.join(', ') : '',
        existingPhotoUrls: property.photos ? property.photos.map(p => p.url).join('\n') : '',
        newImages: [],
        newImagePreviews: [],
        contactName: property.contact?.name || '',
        contactPhone: property.contact?.phone || '',
        contactEmail: property.contact?.email || '',
        minimumStay: property.terms?.minimumStay || '',
        securityDeposit: property.terms?.securityDeposit || '',
        utilitiesIncluded: property.terms?.utilitiesIncluded || false,
        petsAllowed: property.terms?.petsAllowed || false,
        smokingAllowed: property.terms?.smokingAllowed || false,
        additionalRules: property.terms?.additionalRules || ''
      });
    } catch (err) {
      setError('Failed to load property details.');
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.newImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    setFormData(prev => ({ ...prev, newImages: [...prev.newImages, ...files] }));
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          newImagePreviews: [...prev.newImagePreviews, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index) => {
    setFormData(prev => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
      newImagePreviews: prev.newImagePreviews.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const propertyData = {
      title: formData.title,
      description: formData.description,
      propertyType: formData.propertyType,
      location: {
        division: formData.division,
        district: formData.district,
        address: formData.address
      },
      rent: {
        amount: Number(formData.rentAmount),
        period: formData.rentPeriod
      },
      features: {
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        size: formData.sizeValue ? {
          value: Number(formData.sizeValue),
          unit: formData.sizeUnit
        } : undefined,
        furnished: formData.furnished
      },
      amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : [],
      photos: formData.photoUrls ? formData.photoUrls.split('\n').filter(url => url.trim()).map(url => ({
        url: url.trim(),
        caption: ''
      })) : [],
      contact: {
        name: formData.contactName,
        phone: formData.contactPhone,
        email: formData.contactEmail || undefined
      },
      terms: {
        minimumStay: formData.minimumStay || undefined,
        securityDeposit: formData.securityDeposit ? Number(formData.securityDeposit) : undefined,
        utilitiesIncluded: formData.utilitiesIncluded,
        petsAllowed: formData.petsAllowed,
        smokingAllowed: formData.smokingAllowed,
        additionalRules: formData.additionalRules || undefined
      }
    };

    try {
      // If user added new images, use FormData (like create page)
      // Otherwise, just send JSON as before
      if (formData.newImages.length > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append('title', formData.title);
        uploadFormData.append('description', formData.description);
        uploadFormData.append('propertyType', formData.propertyType);
        uploadFormData.append('location', JSON.stringify({ division: formData.division, district: formData.district, address: formData.address }));
        uploadFormData.append('rent', JSON.stringify({ amount: Number(formData.rentAmount), period: formData.rentPeriod }));
        uploadFormData.append('features', JSON.stringify({ bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined, bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined, size: formData.sizeValue ? { value: Number(formData.sizeValue), unit: formData.sizeUnit } : undefined, furnished: formData.furnished }));
        uploadFormData.append('amenities', JSON.stringify(formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : []));
        uploadFormData.append('existingPhotos', formData.existingPhotoUrls);
        uploadFormData.append('contact', JSON.stringify({ name: formData.contactName, phone: formData.contactPhone, email: formData.contactEmail || undefined }));
        uploadFormData.append('terms', JSON.stringify({ minimumStay: formData.minimumStay || undefined, securityDeposit: formData.securityDeposit ? Number(formData.securityDeposit) : undefined, utilitiesIncluded: formData.utilitiesIncluded, petsAllowed: formData.petsAllowed, smokingAllowed: formData.smokingAllowed, additionalRules: formData.additionalRules || undefined }));
        formData.newImages.forEach(image => uploadFormData.append('images', image));

        const axios = (await import('axios')).default;
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/properties/${id}`,
          uploadFormData,
          { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        // No new images — send plain JSON (existing behavior)
        await propertyAPI.updateProperty(id, {
          title: formData.title,
          description: formData.description,
          propertyType: formData.propertyType,
          location: { division: formData.division, district: formData.district, address: formData.address },
          rent: { amount: Number(formData.rentAmount), period: formData.rentPeriod },
          features: { bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined, bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined, size: formData.sizeValue ? { value: Number(formData.sizeValue), unit: formData.sizeUnit } : undefined, furnished: formData.furnished },
          amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : [],
          photos: formData.existingPhotoUrls ? formData.existingPhotoUrls.split('\n').filter(u => u.trim()).map(u => ({ url: u.trim(), caption: '' })) : [],
          contact: { name: formData.contactName, phone: formData.contactPhone, email: formData.contactEmail || undefined },
          terms: { minimumStay: formData.minimumStay || undefined, securityDeposit: formData.securityDeposit ? Number(formData.securityDeposit) : undefined, utilitiesIncluded: formData.utilitiesIncluded, petsAllowed: formData.petsAllowed, smokingAllowed: formData.smokingAllowed, additionalRules: formData.additionalRules || undefined }
        });
      }
      addToast('Property updated successfully!', 'success');
      router.push('/dashboard/owner');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update. Please try again.', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="property-form-page">
      <div className="container">
        <div className="form-header">
          <h1>Edit Property</h1>
          <p>Update your property details</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label className="form-label">Property Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., Beautiful 2BHK Apartment in Dhanmondi"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Describe your property in detail..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Property Type *</label>
                <select
                  name="propertyType"
                  className="form-select"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="apartment">Apartment</option>
                  <option value="hostel">Hostel</option>
                  <option value="sublet">Sublet</option>
                  <option value="room">Room</option>
                  <option value="house">House</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Division *</label>
                <select
                  name="division"
                  className="form-select"
                  value={formData.division}
                  onChange={handleChange}
                  required
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">District *</label>
                <input
                  type="text"
                  name="district"
                  className="form-input"
                  placeholder="e.g., Dhaka"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>


            <div className="form-group">
              <label className="form-label">Full Address *</label>
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="e.g., Road 27, House 15, Dhanmondi, Dhaka 1209"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Rent Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Rent Amount (BDT) *</label>
                <input
                  type="number"
                  name="rentAmount"
                  className="form-input"
                  placeholder="e.g., 25000"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Period *</label>
                <select
                  name="rentPeriod"
                  className="form-select"
                  value={formData.rentPeriod}
                  onChange={handleChange}
                >
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Property Features</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="form-input"
                  placeholder="e.g., 2"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="form-input"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Size</label>
                <input
                  type="number"
                  name="sizeValue"
                  className="form-input"
                  placeholder="e.g., 1200"
                  value={formData.sizeValue}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Unit</label>
                <select
                  name="sizeUnit"
                  className="form-select"
                  value={formData.sizeUnit}
                  onChange={handleChange}
                >
                  <option value="sqft">Square Feet</option>
                  <option value="sqm">Square Meters</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Furnished Status</label>
              <select
                name="furnished"
                className="form-select"
                value={formData.furnished}
                onChange={handleChange}
              >
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2>Amenities</h2>

            <div className="form-group">
              <label className="form-label">Amenities (comma-separated)</label>
              <input
                type="text"
                name="amenities"
                className="form-input"
                placeholder="e.g., WiFi, Parking, Security, Generator, Lift"
                value={formData.amenities}
                onChange={handleChange}
              />
              <small className="form-hint">Separate multiple amenities with commas</small>
            </div>
          </div>

<div className="form-section">
  <h2>Photos</h2>

  {/* Show existing photos */}
  {formData.existingPhotoUrls && (
    <div className="form-group">
      <label className="form-label">Current Photos</label>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {formData.existingPhotoUrls.split('\n').filter(u => u.trim()).map((url, i) => (
          <img key={i} src={url} alt={`Photo ${i+1}`}
            style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #e5e7eb' }}
          />
        ))}
      </div>
      <small className="form-hint">These are your current photos. Upload new ones below to ADD more (max 5 total).</small>
    </div>
  )}

  {/* Upload new photos */}
  <div className="form-group">
    <label className="form-label">Add New Photos</label>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleImageChange}
      className="form-input"
      style={{ padding: '12px' }}
    />
    <small className="form-hint">JPG, PNG, WebP. Max 5MB each.</small>
  </div>

  {/* Preview new photos */}
  {formData.newImagePreviews.length > 0 && (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginTop: '12px' }}>
      {formData.newImagePreviews.map((preview, index) => (
        <div key={index} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1' }}>
          <img src={preview} alt={`New ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button type="button" onClick={() => removeNewImage(index)}
            style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.7)',
              color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '14px' }}>
            ×
          </button>
        </div>
      ))}
    </div>
  )}
</div>

          <div className="form-section">
            <h2>Contact Information</h2>

            <div className="form-group">
              <label className="form-label">Contact Name *</label>
              <input
                type="text"
                name="contactName"
                className="form-input"
                placeholder="Your name"
                value={formData.contactName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  className="form-input"
                  placeholder="01712345678"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email (Optional)</label>
                <input
                  type="email"
                  name="contactEmail"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Terms & Conditions</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Minimum Stay</label>
                <input
                  type="text"
                  name="minimumStay"
                  className="form-input"
                  placeholder="e.g., 6 months, 1 year"
                  value={formData.minimumStay}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Security Deposit (BDT)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  className="form-input"
                  placeholder="e.g., 50000"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="utilitiesIncluded"
                  checked={formData.utilitiesIncluded}
                  onChange={handleChange}
                />
                <span>Utilities Included</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formData.petsAllowed}
                  onChange={handleChange}
                />
                <span>Pets Allowed</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="smokingAllowed"
                  checked={formData.smokingAllowed}
                  onChange={handleChange}
                />
                <span>Smoking Allowed</span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Additional Rules</label>
              <textarea
                name="additionalRules"
                className="form-textarea"
                placeholder="Any additional rules or conditions for tenants..."
                value={formData.additionalRules}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.push('/dashboard/owner')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating Property...' : 'Update Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditProperty = () => {
  return (
    <ProtectedRoute ownerOnly={true}>
      <EditPropertyContent />
    </ProtectedRoute>
  );
};

export default EditProperty;