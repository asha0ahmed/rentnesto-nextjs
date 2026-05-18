const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Resend } = require('resend');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Email transporter setup
const resend = new Resend(process.env.RESEND_API_KEY);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Always return success (security - don't reveal if email exists)
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If this email exists, a reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    // Save token to user
     await User.updateOne(
      { _id: user._id },
         {
           $set: {
           resetPasswordToken: resetToken,
           resetPasswordExpires: new Date(resetExpires)
           }
          }
      );

    // Build reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

// Respond immediately — don't wait for email
res.status(200).json({
  success: true,
  message: 'If this email exists, a reset link has been sent.'
});

// Send email in background (non-blocking)
resend.emails.send({
      from: 'RentNesto <noreply@rentnesto.xyz>',
      to: user.email,
      subject: 'RentNesto - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb;">RentNesto</h1>
          </div>
          <h2 style="color: #1f2937;">Password Reset Request</h2>
          <p style="color: #4b5563; font-size: 16px;">
            You requested to reset your password. Click the button below to set a new password.
          </p>
          <p style="color: #4b5563; font-size: 16px;">
            This link will expire in <strong>1 hour</strong>.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetURL}" 
               style="background: #2563eb; color: white; padding: 14px 32px; 
                      border-radius: 8px; text-decoration: none; font-size: 16px; 
                      font-weight: 600; display: inline-block;">
              Reset My Password
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            If you did not request this, please ignore this email. Your password will not change.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            Or copy this link: <a href="${resetURL}" style="color: #2563eb;">${resetURL}</a>
          </p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © 2026 RentNesto Bangladesh. All rights reserved.
          </p>
        </div>
      `
    })

   .catch(err => {
    console.error('Background email send failed:', err);
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reset email. Please try again.'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password using token
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Find user with valid token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Reset link is invalid or has expired. Please request a new one.'
      });
    }

    // Update password and clear token
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Generate JWT and auto login
    const jwtToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully!',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          mobile: user.mobile,
          accountType: user.accountType
        },
        token: jwtToken
      }
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.'
    });
  }
});

module.exports = router;